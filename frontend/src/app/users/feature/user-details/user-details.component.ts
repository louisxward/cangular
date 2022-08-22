
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/user.service';
import { create, User } from '../../user'
import { Router, ActivatedRoute } from '@angular/router';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-user-list',
  template: `
  <div class="header">
    <h1>User Details</h1>
  </div>
  <div class="content" *ngIf="isDataAvailable">
      
    <form [formGroup]="userForm" class="needs-validation" (ngSubmit)="onSubmit()" novalidate>
  
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Username</span>
        <input type="text" class="form-control" placehol der="username" aria-label="Username" aria-describedby="basic-addon1" formControlName="username">
      </div>



      <div class="input-group mb-3">
        <span class="input-group-text">First and Last name</span>
        <input type="text" aria-label="First name" class="form-control" formControlName="firstName">
        <input type="text" aria-label="Last name" class="form-control" formControlName="lastName">
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Email</span>
        <input type="text" class="form-control" placeholder="email" aria-label="email" aria-describedby="basic-addon1" formControlName="email" >
      </div>


      <button type="submit" class="btn btn-primary  float-end" [disabled]="userForm.pristine"><fa-icon [icon]="faSave"></fa-icon></button>
      <div class="alert alert-danger" role="alert" *ngIf="userForm.hasError('userForm')">
        Not Valid
      </div>
    </form>

  </div>
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


  constructor(private api: ApiService, private route: ActivatedRoute, private router:Router, private fb:FormBuilder) {
  }


  refresh(){
		this.router.navigate(['/users/', this.user.id]); // navigate to other page
	}


  ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
   });
   if(this.id == 0){
    this.createUser();
   }
   else{
    this.getUser();
   }
  }

  getUser(){
    this.api.getUser(this.id).subscribe((response:User) => {
      this.user = response;
      console.log(this.user.id);
      this.isDataAvailable = true;
      console.log(this.user)
      this.userForm = this.createFormGroup();
    });
  }

  createUser(){
    this.user = create();
    this.isDataAvailable = true;
    console.log(this.user)
    this.userForm = this.createFormGroup();
  }

  saveUser(user: User){
    console.log("saveUser()")
    this.api.saveUser(user);
  }

  addUser(user: User){
    console.log("addUser()")
    this.api.addUser(user).subscribe((response:User) => {
      console.log("New ID: ", response.id);
      console.log("New Email: ",response.email);
      console.log(response);
      this.user = response;
      console.log(this.user.id);
      this.refresh()
    });
    
  }

  onSubmit() {
    if(this.userForm.invalid) {
      console.log("invalid");
      console.log(this.userForm.value);
      this.userForm.setErrors({ ...this.userForm.errors, 'userForm': true });
      return;
    }
    const result: User = Object.assign({}, this.userForm.value);
    console.log(result);
    
    if(this.id == 0){
      this.addUser(result);
     }
     else{
      this.saveUser(result);
     }
    
    


  }

  createFormGroup() {
    return new FormGroup({
      id: new FormControl(this.user.id),
      username: new FormControl(this.user.username, Validators.required),
      email: new FormControl(this.user.email, Validators.required),
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required)
    });
  }

}
