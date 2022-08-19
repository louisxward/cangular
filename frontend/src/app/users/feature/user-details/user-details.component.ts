
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/user.service';
import { User } from '../../user'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  template: `
  <div class="header">
    <h1>User Details</h1>
  </div>
  <div *ngIf="isDataAvailable">
    <h3>{{id}}</h3>
    <h3>{{user.email}}</h3>
  </div>
  `,
  styles: [
  ]
})

export class UserDetailsComponent implements OnInit {
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

}
