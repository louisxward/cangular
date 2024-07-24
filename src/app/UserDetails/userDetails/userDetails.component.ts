import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageHeaderComponent } from '../../Core/components/page-header/page-header.component';
import { UserFormComponent } from '../components/user-form/user-form.component'
import PocketBase from 'pocketbase'
import { ApiService } from 'src/app/Core/services/api/api.service';
import { SocialService } from 'src/app/Core/services/social/social.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { UploadService } from 'src/app/Core/services/upload/upload.service';
import { AuthGuardService } from 'src/app/Core/services/auth/auth-guard.service';


@Component({
  selector: 'app-userDetails',
  templateUrl: './userDetails.component.html',
  styleUrls: ['./userDetails.component.scss']
})
export class UserDetailsComponent {

  pb: PocketBase

  loader = this.loadingBarService.useRef();
  
  followingId: string | null = null
  mutualFollowing: boolean = false
  followPending: boolean = false

  detailsUserId: string
  avatarUrl: string = ""
  lastLoggedIn: string = ""

  currentUser: boolean = false
  loaded: boolean = false
  found: boolean = false
  create: boolean = false

  userData = {
    id: "0",
    username: "",
    email: "",
  }
  
  constructor(private route: ActivatedRoute, private apiService: ApiService, private loadingBarService: LoadingBarService, private uploadService: UploadService, private socialService: SocialService, private authGuardService: AuthGuardService ) {
    this.pb = apiService.pb
    const param = this.route.snapshot.paramMap.get("userId")
    this.detailsUserId = param ? param : "0"
  }

  async ngOnInit() {
    if(this.detailsUserId != "0"){
      await this.loadUser()
    }
    else{
      this.loaded = true
      this.found = true
      this.create = true
    }
  }

  ngOnDestroy() {
    this.pb.cancelAllRequests();
    this.loader.complete()
  }

  async loadUser(){
    this.loader.start()
    console.log("loadUser()")
    const myPromise = this.pb.collection('users').getOne(this.detailsUserId, {})
    await myPromise.then((value) => { 
      console.log("User Found")
      console.log(value)
      this.userData = {
        id: value.id,
        username: value.username,
        email: value.email,
      }
      this.lastLoggedIn = value.lastLoggedIn
      this.found = true
      this.getAvatarUrl(value.avatar, "200x200").then(url => {this.avatarUrl = url})
    })
   .catch((error)=>{ 
      console.log(error)
      console.log("User Not Found")
    })
    // Check if current user is viewing profile
    this.currentUser = (this.authGuardService.userId == this.detailsUserId)
    // Social setup
    if(!this.currentUser){
      await this.socialService.checkFollowing(this.authGuardService.userId, this.detailsUserId)
      .then(followingId => {
        this.followingId = followingId
      })
      if(null != this.followingId){
        // If user follows profile. check profile follows user
        await this.socialService.checkFollowing(this.detailsUserId, this.authGuardService.userId)
        .then(followingId => {
          this.mutualFollowing = null != followingId
        })
      }
    }
    this.loaded = true
    this.loader.complete()
  }

  async follow(){
    this.loader.start()
    this.followPending = true
    await this.socialService.follow(this.authGuardService.userId, this.detailsUserId).then(followingId => {this.followingId = followingId})
    await this.socialService.checkFollowing(this.detailsUserId, this.authGuardService.userId)
    .then(followingId => {
      this.mutualFollowing = null != followingId
    })
    this.followPending = false
    this.loader.complete()
  }

  async unfollow(){
    this.loader.start()
    this.followPending = true
    if(null != this.followingId){
      await this.socialService.unfollow(this.followingId).then(followingId => {this.followingId = followingId})
    }
    this.mutualFollowing = false
    this.followPending = false
    this.loader.complete()
  }

  async getAvatarUrl(fileName: string | null, thumbSize: string | null): Promise<string>{
    if(null == fileName || fileName == "") return ""
    let url = ""
    await this.uploadService.getFileUrl(this.detailsUserId, fileName, thumbSize).then(foundUrl => {url = foundUrl})
    return url
  }
}
