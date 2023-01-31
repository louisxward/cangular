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

  followPending: boolean

  detailsUserId: string
  avatarUrl: string
  lastLoggedIn: string
  followingId: string
  mutualFollowing: boolean
  loaded = false
  found = false
  userData = {
    id: "0",
    username: "",
    email: "",
  }
  
  constructor(private route: ActivatedRoute, private apiService: ApiService, private loadingBarService: LoadingBarService, private uploadService: UploadService, private socialService: SocialService, private authGuardService: AuthGuardService ) {
    this.loader.start()
    this.pb = apiService.pb
    const param = this.route.snapshot.paramMap.get("userId")
    this.detailsUserId = param ? param : "0"
    this.avatarUrl = ""
    this.lastLoggedIn = ""
    this.followingId = ""
    this.followPending = false
    this.mutualFollowing = false;
    if(this.detailsUserId != "0"){
      this.loadUser()
    }
    else{
      this.loaded = true
      this.found = true
      this.loader.complete()
    }
  }

  async getAvatarUrl(fileName: string | null): Promise<string>{
    if(null == fileName ||fileName == "") return ""
    let url = ""
    await this.uploadService.getFileUrl(this.detailsUserId, fileName).then(foundUrl => {url = foundUrl}).catch()
    return url
  }

  notCurrentUser(){
    return this.authGuardService.userId != this.detailsUserId
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.pb.cancelAllRequests();
    this.loader.complete()
  }

  async loadUser(){
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
      this.socialService.checkFollowing(this.authGuardService.userId, this.detailsUserId).then(followingId => {this.followingId = followingId})
      this.mutuallyFollowing().then(mutualFollowing => {this.mutualFollowing = mutualFollowing})
      console.log(this.followingId)
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
    this.followPending = false
    this.mutuallyFollowing().then(mutualFollowing => {this.mutualFollowing = mutualFollowing})
    this.loader.complete()
  }

  async unfollow(){
    this.loader.start()
    this.followPending = true
    await this.socialService.unfollow(this.followingId).then(followingId => {this.followingId = followingId})
    this.followPending = false
    this.mutuallyFollowing().then(mutualFollowing => {this.mutualFollowing = mutualFollowing})
    this.loader.complete()
  }

  async mutuallyFollowing(){
    const userIdA = this.authGuardService.userId
    const userIdB = this.detailsUserId
    let userAFollows = ""
    let userBFollows = ""
    await this.socialService.checkFollowing(userIdA, userIdB).then(followingId => {userAFollows = followingId})
    await this.socialService.checkFollowing(userIdB, userIdA).then(followingId => {userBFollows = followingId})
    return (userAFollows != "" && userBFollows != "")
  }
}
