
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/user.service';
import { User } from '../../user'
import { Observable } from 'rxjs';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-list',
  template: `
  <div class="header">
    <h1>User List</h1>
      <button type="button" class="btn btn-primary"><fa-icon [icon]="faPlus"></fa-icon></button>
  </div>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">UID</th>
        <th scope="col">Username</th>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">Email</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor='let user of users | async'>
          <td style="text-align: center;"><input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input"></td>
          <td scope="row">{{user.id}}</td>
          <td>{{user.username}}</td>
          <td>{{user.firstName}}</td>
          <td>{{user.lastName}}</td>
          <td>{{user.email}}</td>
      </tr>
    </tbody>
  </table>
  `,
  styles: [
  ]
})
export class UserDetailsComponent implements OnInit {

  users!: Observable<User[]>

  constructor(private api: ApiService) {}

  faPlus = faPlus;

  ngOnInit(){
    this.getUsers()
  }

  getUsers(){
    this.users = this.api.getUsers()
  }

}
