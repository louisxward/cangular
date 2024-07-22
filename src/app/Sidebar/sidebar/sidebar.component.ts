import { Component } from '@angular/core';
import { Store } from "@ngxs/store";
import { User, UserState } from "src/app/Core/state/user";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})


export class SidebarComponent {

  isLoggedIn$ = this.store.select(UserState.isLoggedIn);
  userId$ = this.store.select(UserState.getUserId);
  avatarUrl$ = this.store.select(UserState.getAvatarUrl)
  username$ = this.store.select(UserState.getUsername)
  email$ = this.store.select(UserState.getEmail)
  sidebarExpanded$ = this.store.select(UserState.getSidebarExpanded)

  constructor(private store: Store) {}


  updateSidebarState(){
    this.store.dispatch(
      new User.Update.Sidebar())
  }
}