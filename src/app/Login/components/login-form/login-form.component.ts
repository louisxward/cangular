import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Action, StateContext, Store } from "@ngxs/store";
import { User, UserState, UserStateModel } from "src/app/Core/state/user";


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit{


    loginForm:FormGroup;

    constructor(private router: Router, private fb:FormBuilder, private store: Store){
        this.loginForm = this.fb.group({
            username: ["", [Validators.required]],
            password: ["", [Validators.required]]
        });
    }

    ngOnInit(): void {
    }

    submit(): void {
        console.log("Form Submitted")
        console.log(this.loginForm.value)
        this.login()
    }

    login(): void {
        this.store.dispatch(
          new User.Login.LoginFlowInitiated({
            username: this.loginForm.value.username,
            password: this.loginForm.value.password
          })
        );
      }

      //not sure why this isnt being called, did seem too good to be true. currently being called from user.state returns windows pop up error but want to show form error 
      @Action(User.Login.LoginFlowUnsuccessful)
      loginUnsuccessful() {
        console.log("loginUnsuccessful()")
      }

}
