
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/user.service';
import { User } from '../../user'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  template: `
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th scope="col">UID</th>
        <th scope="col">Username</th>
        <th scope="col">Email</th>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor='let user of users | async'>
          <td scope="row">{{user.id}}</td>
          <td>{{user.username}}</td>
          <td>{{user.email}}</td>
          <td>{{user.firstName}}</td>
          <td>{{user.lastName}}</td>
      </tr>
    </tbody>
  </table>
  `,
  styles: [
  ]
})
export class UserListComponent implements OnInit {

  users!: Observable<User[]>

  constructor(private api: ApiService) {}


  ngOnInit(){
    this.getUsers()
  }

  getUsers(){
    this.users = this.api.getUsers()
  }

}
