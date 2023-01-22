import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit{


    loginForm:FormGroup;

    constructor(private router: Router, private fb:FormBuilder){
        this.loginForm = this.fb.group({
            username: "",
            password: ""
        });

    }

    ngOnInit(): void {
    }

    submit() {
        console.log("Form Submitted")
        console.log(this.loginForm.value)
    }
}
