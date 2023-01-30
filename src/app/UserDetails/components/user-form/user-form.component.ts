import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router'
import PocketBase from 'pocketbase'
import { Error, ErrorContainer, User } from './error'
import { Record } from "pocketbase";
import { ApiService } from 'src/app/Core/services/api/api.service';
import { LoadingBarService } from '@ngx-loading-bar/core';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent{
  pb: PocketBase

  loader = this.loadingBarService.useRef();
  
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

    constructor(private router: Router, private fb:FormBuilder, private apiService: ApiService, private loadingBarService: LoadingBarService){
      this.pb = apiService.pb
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

    ngOnDestroy() {
      this.pb.cancelAllRequests;
    }

    async submit() {
      this.loader.start()
      console.log("Form Submitted")
      console.log(this.form.value)
      if(this.userData.id == "0"){
        await this.createUser()
      }
      else{
        await this.saveUser()
      }
      this.loader.complete()
    }

    async saveUser(){
      const myPromise = this.pb.collection('users').update(this.userData.id, this.form.value);
      await this.handlePromise(myPromise, false);
    }

    async createUser(){
      const myPromise = this.pb.collection('users').create(this.form.value);
      await this.handlePromise(myPromise, true);
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
