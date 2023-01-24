import {  Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserState } from "src/app/Core/state/user";
import { Store } from "@ngxs/store";

@Injectable()
export class AuthGuardService implements CanActivate {
  isLoggedIn$ = this.store.select(UserState.isLoggedIn);

  constructor(public router: Router, private store: Store) {}

  canActivate(): boolean {
    console.log("canActivate()")
    if (!this.isLoggedIn$) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
}