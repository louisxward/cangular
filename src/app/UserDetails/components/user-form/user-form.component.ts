import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Action, StateContext, Store } from "@ngxs/store";
import { User, UserState, UserStateModel } from "src/app/Core/state/user";


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit{


    userForm:FormGroup

    constructor(private fb:FormBuilder){
      this.userForm = this.fb.group({
        username: ["", [Validators.required]],
    });
    }

    ngOnInit(): void {
    }

    submit(): void {
        console.log("Form Submitted")
        console.log(this.userForm.value)
    }

}
