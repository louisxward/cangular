import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../Core/components/page-header/page-header.component'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import PocketBase from 'pocketbase'

@Component({
  selector: 'app-userDetails',
  templateUrl: './userDetails.component.html',
  styleUrls: ['./userDetails.component.scss']
})
export class UserDetailsComponent  implements OnInit{

  pb = new PocketBase('http://127.0.0.1:8090')
  
  userId: string
  userForm:FormGroup;
  loaded = false
  found = false;


  constructor(private route: ActivatedRoute, private fb:FormBuilder){
    const param = this.route.snapshot.paramMap.get("userId");
    if(null != param){
      this.userId = param
    }
    else{
      this.userId = "0"
    }
    console.log(this.userId)
    this.userForm = this.fb.group({
      username: ""
    });
    if(this.userId != "0"){
      this.loadUser()
    }
    else{
      this.loaded = true
    }
  }

  ngOnInit() {
    console.log(this.userForm.value.username)
  }

  loadUser(){
    console.log("loadUser()")
    const myPromise = this.pb.collection('users').getOne(this.userId, {})
    myPromise.then((value) => { 
        console.log(value)
        this.loaded = true
        this.found = true;
        this.userForm.value.username = value.username
        console.log(value.username)
   })
   .catch((error)=>{ 
      console.log(error)
      this.loaded = true
    }) 
  }

}
