import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageHeaderComponent } from '../../Core/components/page-header/page-header.component';
import { UserFormComponent } from '../components/user-form/user-form.component'
import PocketBase from 'pocketbase'
import { ApiService } from 'src/app/Core/services/api/api.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { UploadService } from 'src/app/Core/services/upload/upload.service';



@Component({
  selector: 'app-userDetails',
  templateUrl: './userDetails.component.html',
  styleUrls: ['./userDetails.component.scss']
})
export class UserDetailsComponent {

  pb: PocketBase

  loader = this.loadingBarService.useRef();

  userId: string
  avatarUrl: string
  lastLoggedIn: string
  loaded = false
  found = false
  userData = {
    id: "0",
    username: "",
    email: "",
    avatar: "",
  }
  
  constructor(private route: ActivatedRoute, private apiService: ApiService, private loadingBarService: LoadingBarService, private uploadService: UploadService ) {
    this.loader.start()
    this.pb = apiService.pb
    const param = this.route.snapshot.paramMap.get("userId")
    this.userId = param ? param : "0"
    this.avatarUrl = ""
    this.lastLoggedIn = ""
    if(this.userId != "0"){
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
    await this.uploadService.getFileUrl(this.userId, fileName).then(foundUrl => {url = foundUrl}).catch()
    return url
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.pb.cancelAllRequests();
    this.loader.complete()
  }

  async loadUser(){
    console.log("loadUser()")
    const myPromise = this.pb.collection('users').getOne(this.userId, {})
    await myPromise.then((value) => { 
      console.log("User Found")
      this.userData = {
        id: value.id,
        username: value.username,
        email: value.email,
        avatar: value.avatar,
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
}
