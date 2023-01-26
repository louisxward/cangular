import { Injectable } from '@angular/core';
import { Store } from "@ngxs/store";
import { User } from "src/app/Core/state/user";
import PocketBase from 'pocketbase';
import { Router } from "@angular/router";
import { NotificationService } from 'src/app/Core/services/notification/notification.service';

@Injectable()
export class LoginService {
  
  pb = new PocketBase('http://127.0.0.1:8090')
  
  constructor(private store: Store, private router: Router, private notificationService: NotificationService) { 
  }

  login(username: string, password: string): string {
    const myPromise = this.pb.collection('users').authWithPassword(username, password)
    myPromise.then((value) => { 
      console.log("found user")
      this.store.dispatch(
        new User.Login.LoginFlowInitiated({
          record: value.record
        }))
      this.setLastLoggedIn(value.record.id)
      this.router.navigate(['/profile']);
      return "user found"
    })
   .catch((error)=>{ 
      console.log(error)
      console.log("user not found")
      this.notificationService.error("not found");
    })
    return "uset not found" 
  }

  logout(){
    this.store.dispatch(new User.Login.LogoutFlowInitiated());
  }

  setLastLoggedIn(id: string){
    const currentDate = new Date();
    this.pb.collection('users').update(id, {"lastLoggedIn": currentDate});
  }

}