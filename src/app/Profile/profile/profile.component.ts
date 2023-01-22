import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../Core/components/page-header/page-header.component';
import { Store } from "@ngxs/store";
import { User, UserState } from "src/app/Core/state/user";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  isLoggedIn$ = this.store.select(UserState.isLoggedIn);
  userId$ = this.store.select(UserState.getUserId);

  constructor(private store: Store) {}

  login(): void {
    this.store.dispatch(
      new User.Login.LoginFlowInitiated({
        username: "louis",
        password: "12345"
      })
    );
  }

  logout(): void {
    this.store.dispatch(new User.Login.LogoutFlowInitiated());
  }
}
