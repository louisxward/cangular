
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/user.service';
import { User } from '../../user'
import { ActivatedRoute } from '@angular/router';
import { faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-list',
  template: `
  <div class="header">
    <h1>User Details</h1>
  </div>
  <div class="content" *ngIf="isDataAvailable">
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Username</span>
        <input type="text" class="form-control" placeholder="username" aria-label="Username" aria-describedby="basic-addon1"
          value="{{this.user.username}}" #username (blur)="this.user.username = username.value; print()"
        >
      </div>



      <div class="input-group mb-3">
        <span class="input-group-text">First and Last name</span>
        <input type="text" aria-label="First name" class="form-control"
        value="{{this.user.firstName}}" #firstName (blur)="this.user.firstName = firstName.value; print()">
        <input type="text" aria-label="Last name" class="form-control"
        value="{{this.user.lastName}}" #lastName (blur)="this.user.lastName = lastName.value; print()">
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Email</span>
        <input type="text" class="form-control" placeholder="email" aria-label="email" aria-describedby="basic-addon1"
          value="{{this.user.email}}" #email (blur)="this.user.email = email.value; print()"
        >
      </div>

      
      <button type="submit" (click)="this.saveUser()" class="btn btn-primary  float-end"><fa-icon [icon]="faSave"></fa-icon></button>
  </div>

<!-- (keyup.enter)="this.user.username = username.value; print()" -->
  `,
  styles: [
  ]
})

export class UserDetailsComponent implements OnInit {
  faSave = faSave;

  id!: number;
  private sub: any;
  isDataAvailable: boolean = false;

  user!: User;



  constructor(private api: ApiService, private route: ActivatedRoute) {}

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
    });
  }

  saveUser(){
    this.api.saveUser(this.user);
  }

  print(){
    console.log(this.user.username);
  }

  onSubmit(){
    this.saveUser();
  }

}
