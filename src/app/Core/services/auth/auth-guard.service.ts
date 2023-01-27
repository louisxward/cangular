import {  Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserState } from "src/app/Core/state/user";
import { Store } from "@ngxs/store";

@Injectable()
export class AuthGuardService implements CanActivate {
  isLoggedIn = false;
  userId = ""

  constructor(public router: Router, private store: Store) {
    this.store.select(UserState.isLoggedIn).subscribe(f => {this.isLoggedIn = f})
    this.store.select(UserState.getUserId).subscribe(f => {this.userId = f})
  }

  canActivate(): boolean {
    if (!this.isLoggedIn) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }


  
}