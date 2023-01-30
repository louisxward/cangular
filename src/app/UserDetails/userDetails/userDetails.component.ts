import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageHeaderComponent } from '../../Core/components/page-header/page-header.component';
import { UserFormComponent } from '../components/user-form/user-form.component'
import PocketBase from 'pocketbase'
import { ApiService } from 'src/app/Core/services/api/api.service';



@Component({
  selector: 'app-userDetails',
  templateUrl: './userDetails.component.html',
  styleUrls: ['./userDetails.component.scss']
})
export class UserDetailsComponent {

  pb: PocketBase

  userId: string
  loaded = false
  found = false
  userData = {
    id: "0",
    username: "",
    email: "",
  }
  
  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.pb = apiService.pb
    const param = this.route.snapshot.paramMap.get("userId")
    this.userId = param ? param : "0"
    if(this.userId != "0"){
      this.loadUser()
    }
    else{
      this.loaded = true
      this.found = true
    }
  }

  ngOnInit() {
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
      }
      this.found = true
    })
   .catch((error)=>{ 
      console.log(error)
      console.log("User Not Found")
    })
    this.loaded = true
  }
}
