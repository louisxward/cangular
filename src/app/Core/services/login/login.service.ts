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

  async login(username: string, password: string): Promise<string> {
    const myPromise = this.pb.collection('users').authWithPassword(username, password)
    let response = ""
    await myPromise.then((value) => { 
      console.log("user found")
      response = "user found"
      this.store.dispatch(
        new User.Login.Login({
          record: value.record
        }))
      this.setLastLoggedIn(value.record.id)
      this.router.navigate(['/profile']);
      this.notificationService.success("welcome " + value.record.username)
    })
   .catch((error)=>{ 
      response =  "incorrect email/password"
      console.log(error)
      console.log("user not found")
    })
    return response
  }

  logout(){
    this.store.dispatch(new User.Login.Logout());
    this.notificationService.success("logged out")
  }

  setLastLoggedIn(id: string){
    this.pb.collection('users').update(id, {"lastLoggedIn": new Date()});
  }

}