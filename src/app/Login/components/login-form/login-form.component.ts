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

    favoriteColorControl = new FormControl('');

    constructor(private router: Router, private fb:FormBuilder){
        this.loginForm = this.fb.group({
            username: ["", [Validators.required]],
            password: ["", [Validators.required]]
        });

    }

    get name() { return this.loginForm.get('username'); }

    get power() { return this.loginForm.get('password'); }

    ngOnInit(): void {
    }

    submit(): void {
        console.log("Form Submitted")
        console.log(this.loginForm.value)
    }
}
