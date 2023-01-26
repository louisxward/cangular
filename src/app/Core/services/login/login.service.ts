import { Injectable } from '@angular/core';
import { Action, StateContext, Store } from "@ngxs/store";
import { User, UserState, UserStateModel } from "src/app/Core/state/user";
import PocketBase from 'pocketbase';

@Injectable()
export class LoginService {
  
  pb = new PocketBase('http://127.0.0.1:8090')

  
  constructor(private store: Store) { }

  login(username: string, password: string): string {
    const myPromise = this.pb.collection('users').authWithPassword(username, password)
    myPromise.then((value) => { 
      console.log("found user")
      this.store.dispatch(
        new User.Login.LoginFlowInitiated({
          record: value
        }))
      return "user found"
    })
   .catch((error)=>{ 
      console.log(error)
      console.log("user not found")
    })
    return "uset not found" 
  }
}