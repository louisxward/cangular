import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router'
import PocketBase from 'pocketbase'
import { Error, ErrorContainer } from './error'


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})



export class UserFormComponent implements OnInit{
  pb = new PocketBase('http://127.0.0.1:8090')  
  
  @Input('userData') userData = {
      id: "",
      username: "louis",
      email: "123123@213123.com",
    } 

    form:FormGroup
    response = ""

    constructor(private router: Router, private fb:FormBuilder){
      this.form = this.fb.group({})
    }

    ngOnInit(): void {
      this.form.addControl( 'username', new FormControl(this.userData.username, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64)
      ])))
      this.form.addControl( 'email', new FormControl(this.userData.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]))//only admins can edit emails, creation still allows anyone to set the email
      if(this.userData.id == "0"){
        this.form.addControl( 'emailVisibility', new FormControl(true, Validators.required))
        this.form.addControl( 'password', new FormControl("54321", Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(64)
        ])))
        this.form.addControl( 'passwordConfirm', new FormControl("12345", Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(64)
        ])))
      }
    }

    submit(): void {
        console.log("Form Submitted")
        console.log(this.form.value)
        if(this.userData.id == "0"){
          this.createUser()
        }
        else{
          this.saveUser()
        }
    }

    async saveUser(){
      let response = ""
      const myPromise = this.pb.collection('users').update(this.userData.id, this.form.value);
      await myPromise.then((value) => { 
        console.log("user saved")
        this.router.navigate(["users"]);//see below comment, added this so it matches current functionality
      })
      .catch((error)=>{
        console.log(error.data.title)
      })
      return response
    }

    async createUser(){
      const myPromise = this.pb.collection('users').create(this.form.value);
      await myPromise.then((value) => { 
        console.log("user created")
        this.router.navigate(["users"]);//should refresh page and show as save instead of redirecting to user list
      })
      .catch((e)=>{ 
        let errorContainer: ErrorContainer = e.data
        console.log(errorContainer)
        let error = errorContainer.data
        console.log(error.passwordConfirm.message)
        console.log(error.username.message)
        console.log(error.email.message)
      })
    }




    
}
