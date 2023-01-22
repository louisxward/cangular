import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../Core/components/page-header/page-header.component';
import { LoginFormComponent } from '../../Login/components/login-form/login-form.component'
import { Store } from "@ngxs/store";
import { User, UserState } from "src/app/Core/state/user";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 
  isLoggedIn$ = this.store.select(UserState.isLoggedIn);

  constructor(private store: Store) {}

}
