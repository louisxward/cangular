import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageHeaderComponent } from '../../Core/components/page-header/page-header.component';
import { UserFormComponent } from '../components/user-form/user-form.component'
import PocketBase from 'pocketbase'



@Component({
  selector: 'app-userDetails',
  templateUrl: './userDetails.component.html',
  styleUrls: ['./userDetails.component.scss']
})
export class UserDetailsComponent {

  pb = new PocketBase('http://127.0.0.1:8090')

  userId: string
  loaded = false
  found = false
  userData = {
    id: "0",
    username: "",
    email: "",
  }
  
  constructor(private route: ActivatedRoute) {
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
