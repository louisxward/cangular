import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../entities/user'
import { Observable } from 'rxjs';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  users!: Observable<User[]>

  constructor(private api: ApiService) {}


  ngOnInit(){
    this.getUsers()
  }

  getUsers(){
    this.users = this.api.getUsers()
  }

}
