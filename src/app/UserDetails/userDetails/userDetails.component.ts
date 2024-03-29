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
  
  followingId: string = ""
  mutualFollowing: boolean = false
  followPending: boolean = false

  detailsUserId: string = ""
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
    this.currentUser = (this.authGuardService.userId == this.detailsUserId)
    await this.socialService.checkFollowing(this.authGuardService.userId, this.detailsUserId).then(followingId => {this.followingId = followingId})
    if(this.followingId != ""){
      await this.socialService.checkFollowing(this.detailsUserId, this.authGuardService.userId).then(followingId => { this.mutualFollowing = (followingId != "") })
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
      this.getAvatarUrl(value.avatar).then(url => {this.avatarUrl = url})
    })
   .catch((error)=>{ 
      console.log(error)
      console.log("User Not Found")
    })
    this.loaded = true
    this.loader.complete()
  }

  async follow(){
    this.loader.start()
    this.followPending = true
    await this.socialService.follow(this.authGuardService.userId, this.detailsUserId).then(followingId => {this.followingId = followingId})
    await this.socialService.checkFollowing(this.detailsUserId, this.authGuardService.userId).then(followingId => { this.mutualFollowing = (followingId != "") })
    this.followPending = false
    this.loader.complete()
  }

  async unfollow(){
    this.loader.start()
    this.followPending = true
    await this.socialService.unfollow(this.followingId).then(followingId => {this.followingId = followingId})
    this.mutualFollowing = false
    this.followPending = false
    this.loader.complete()
  }

  async getAvatarUrl(fileName: string | null): Promise<string>{
    if(null == fileName ||fileName == "") return ""
    let url = ""
    await this.uploadService.getFileUrl(this.detailsUserId, fileName).then(foundUrl => {url = foundUrl}).catch()
    return url
  }
}
