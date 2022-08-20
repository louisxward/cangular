
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/user.service';
import { User } from '../../user'
import { ActivatedRoute } from '@angular/router';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-user-list',
  template: `
  <div class="header">
    <h1>User Details</h1>
  </div>
  <div class="content" *ngIf="isDataAvailable">
      
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()" novalidate>
  
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Username</span>
        <input type="text" class="form-control" placehol der="username" aria-label="Username" aria-describedby="basic-addon1" formControlName="username" [readonly]="true">
      </div>



      <div class="input-group mb-3">
        <span class="input-group-text">First and Last name</span>
        <input type="text" aria-label="First name" class="form-control" formControlName="firstName">
        <input type="text" aria-label="Last name" class="form-control" formControlName="lastName">
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Email</span>
        <input type="text" class="form-control" placeholder="email" aria-label="email" aria-describedby="basic-addon1" formControlName="email">
      </div>


      <button type="submit" class="btn btn-primary  float-end" [disabled]="userForm.pristine"><fa-icon [icon]="faSave"></fa-icon></button>
      <div class="alert alert-danger" role="alert" *ngIf="userForm.hasError('userForm')">
        Not Valid
      </div>
    </form>

  </div>

<!-- (keyup.enter)="this.user.username = username.value; print()" -->
  `,
  styles: [`

    .alert{
      display: inline-block;
      width: 100%;
      margin-top: 15px;
    }


    `]
})

export class UserDetailsComponent implements OnInit {
  faSave = faSave;

  id!: number;
  private sub: any;
  isDataAvailable: boolean = false;

  user!: User;

  userForm!: FormGroup;


  constructor(private api: ApiService, private route: ActivatedRoute, private fb:FormBuilder) {
  }





  ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getUser();
   });
  }

  getUser(){
    this.api.getUser(this.id).subscribe((response:User) => {
      this.user = response;
      console.log(this.user.id);
      this.isDataAvailable = true;
      this.userForm = this.createFormGroup();
    });
  }

  saveUser(user: User){
    this.api.saveUser(user);
  }


  onSubmit() {

    if(this.userForm.invalid) {
      console.log("invalid");
      this.userForm.setErrors({ ...this.userForm.errors, 'userForm': true });
      return;
    }
    const result: User = Object.assign({}, this.userForm.value);


    console.log(result);

    this.saveUser(result);
  }

  createFormGroup() {
    return new FormGroup({
      id: new FormControl(this.user.id, Validators.required),
      username: new FormControl(this.user.username, Validators.required),
      email: new FormControl(this.user.email, Validators.required),
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required)
    });
  }

}
