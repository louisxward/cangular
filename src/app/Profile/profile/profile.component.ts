import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../Core/components/page-header/page-header.component';
import { Store } from "@ngxs/store";
import { User, UserState } from "src/app/Core/state/user";
import PocketBase from 'pocketbase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  pb = new PocketBase('http://127.0.0.1:8090')


  isLoggedIn$ = this.store.select(UserState.isLoggedIn);
  userId$ = this.store.select(UserState.getUserId);
  avatarUrl$ = this.store.select(UserState.getAvatarUrl)
  username$ = this.store.select(UserState.getUsername)
  email$ = this.store.select(UserState.getEmail)

  constructor(private store: Store) {
  }

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

  checkAuth(): void {
    console.log(this.pb.authStore.isValid);
    console.log(this.pb.authStore.token);
  }

  checkStoreAuth(): void {
    this.isLoggedIn$.subscribe(f => {console.log(f)})
    this.userId$.subscribe(f => {console.log(f)})
  }
}




