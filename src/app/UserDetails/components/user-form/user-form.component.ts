import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router'
import PocketBase from 'pocketbase'
import { Error, ErrorContainer, User } from './error'
import { Record } from "pocketbase";

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

    userDefault: User = {
      username: "",
      email: "",
    }

    form:FormGroup
    responses: string[] = []

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
        this.form.addControl( 'password', new FormControl("", Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(64)
        ])))
        this.form.addControl( 'passwordConfirm', new FormControl("", Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(64)
        ])))
      }
      else{
        this.userDefault.username = this.userData.username
        this.userDefault.email = this.userData.email
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

    saveUser(){
      const myPromise = this.pb.collection('users').update(this.userData.id, this.form.value);
      this.handlePromise(myPromise, false);
    }

    createUser(){
      const myPromise = this.pb.collection('users').create(this.form.value);
      this.handlePromise(myPromise, true);
    }

    async handlePromise(myPromise: Promise<Record>, create: boolean){
      await myPromise.then((value) => { 
        create ? console.log("user created") : console.log("user saved")
        this.router.navigate(["users"]);
      })
      .catch((e)=>{ 
        let errorContainer: ErrorContainer = e.data
        console.log(errorContainer)
        let error = errorContainer.data
        let errorMessages: string[] = []
        if(error.passwordConfirm){
          errorMessages.push(error.passwordConfirm.message.replace("Values", "Passwords"))
          this.form.controls['password'].setValue("");
          this.form.controls['passwordConfirm'].setValue("");
        }
        if(error.username){
          errorMessages.push(error.username.message)
          this.form.controls['username'].setValue(this.userDefault.username);
        }
        if(error.email){
          errorMessages.push(error.email.message)
          this.form.controls['email'].setValue(this.userDefault.email);
        }
        this.responses = errorMessages
      })
    }
    
}
