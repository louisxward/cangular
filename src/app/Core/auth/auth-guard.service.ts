import {  Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserState } from "src/app/Core/state/user";
import { Store } from "@ngxs/store";

@Injectable()
export class AuthGuardService implements CanActivate {
  isLoggedIn = false;

  constructor(public router: Router, private store: Store) {
    this.store.select(UserState.isLoggedIn).subscribe(f => {this.isLoggedIn = f})
  }

  canActivate(): boolean {
    console.log("canActivate()")
    console.log(this.isLoggedIn)
    if (!this.isLoggedIn) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
}