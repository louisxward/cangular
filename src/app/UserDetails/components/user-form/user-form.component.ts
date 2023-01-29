import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Action, StateContext, Store } from "@ngxs/store";
import { User, UserState, UserStateModel } from "src/app/Core/state/user";
import PocketBase from 'pocketbase'


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})


export class UserFormComponent implements OnInit{
  pb = new PocketBase('http://127.0.0.1:8090')  
  
  @Input('userData') userData = {
      id: "",
      username: "",
      email: "",
    } 

    userForm:FormGroup

    constructor(private router: Router, private fb:FormBuilder){
      this.userForm = this.fb.group({})
    }

    ngOnInit(): void {
      this.userForm.addControl( 'username', new FormControl(this.userData.username, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64)
      ])))
      this.userForm.addControl( 'email', new FormControl(this.userData.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]))//only admins can edit emails, creation still allows anyone to set the email
      if(this.userData.id == "0"){
        this.userForm.addControl( 'emailVisibility', new FormControl(true, Validators.required))
        this.userForm.addControl( 'password', new FormControl("", Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(64)
        ])))
        this.userForm.addControl( 'passwordConfirm', new FormControl("", Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(64)
        ])))
      }
    }

    submit(): void {
        console.log("Form Submitted")
        console.log(this.userForm.value)
        if(this.userData.id == "0"){
          this.createUser()
        }
        else{
          this.saveUser()
        }
    }

    async saveUser(){
      const myPromise = this.pb.collection('users').update(this.userData.id, this.userForm.value);
      await myPromise.then((value) => { 
        console.log("user saved")
        this.router.navigate(["users"]);//see below comment, added this so it matches current functionality
      })
      .catch((error)=>{
        console.log(error)
      }) 
    }

    async createUser(){
      const myPromise = this.pb.collection('users').create(this.userForm.value);
      await myPromise.then((value) => { 
        console.log("user created")
        this.router.navigate(["users"]);//should refresh page and show as save instead of redirecting to user list
      })
      .catch((error)=>{ 
        console.log(error)
      })
    }

}
