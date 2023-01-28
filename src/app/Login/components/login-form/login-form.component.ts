import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Action, StateContext, Store } from "@ngxs/store";
import { User, UserState, UserStateModel } from "src/app/Core/state/user";
import { LoginService } from 'src/app/Core/services/login/login.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit{


  form: FormGroup;
  errorMessage = ""

  constructor(private loginService: LoginService, private formBuilder: FormBuilder){
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(64)
      ])],
      password: ['12345', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ])]
    });
  }
  
  ngOnInit(): void {
  }

  submit() {
    this.errorMessage = this.loginService.login(
      this.form.get('username')?.value,
      this.form.get('password')?.value)// this value should be a promise
    if(this.errorMessage != ""){
      this.form.reset()
    }
  }
}
