import { Injectable } from "@angular/core";
import { UserStateModel } from "./user.model";
import { State, Action, StateContext, Store, Selector } from "@ngxs/store";
// import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';
import { User } from "./user.actions";
import PocketBase from 'pocketbase';
import { Router } from "@angular/router";

const userStateDefaults: UserStateModel = {
  id: null,
  avatarUrl: null,
  username: null,
  email: null,
}

@State<UserStateModel>({
  name: "user",
  defaults: userStateDefaults,
})



@Injectable()
export class UserState {
    pb = new PocketBase('http://127.0.0.1:8090')
    
    constructor(private store: Store, private router: Router ){}

    async getAvatarUrl(userId: string, fileName: string): Promise<string> {
      let avatarUrl = ""
      const myPromise = this.pb.collection('users').getOne(userId)
      await myPromise.then((value) => { 
        avatarUrl = this.pb.getFileUrl(value, fileName, {})
      })
     .catch((error)=>{ 
        console.log(error)
      })
      return avatarUrl
    }


    @Action(User.Login.LoginFlowUnsuccessful)
    loginUnsuccessful() {
      console.log("loginUnsuccessful()")
      window.alert("User Not Found");
    }

    @Action(User.Login.LoginFlowInitiated)
    login(ctx: StateContext<UserStateModel>, action: User.Login.LoginFlowInitiated) {
      console.log("login()")
      const record = action.payload.record
      this.store.dispatch(new User.Login.UpdateUser({id: record.id, avatar: record.avatar, username: record.username, email: record.email}));
    }

    @Action(User.Login.UpdateUser)
    async updateUser(ctx: StateContext<UserStateModel>, action: User.Login.UpdateUser) {
      console.log("updateUser()")
      const id = action.payload.id
      const avatarFileName = action.payload.avatar
      const username = action.payload.username
      const email = action.payload.email
      let avatarUrl = ""
      if(avatarFileName){
        const myPromise = this.getAvatarUrl(id, avatarFileName)
        await myPromise.then((value) => { 
          avatarUrl = value
        })
       .catch((error)=>{ 
          console.log(error)
        })
      }
      ctx.patchState({
        id: id,
        avatarUrl: avatarUrl,
        username: username,
        email: email,
      })
    }

    @Action(User.Login.LogoutFlowInitiated)
    logout(ctx: StateContext<UserStateModel>) {
      console.log("logOut()")
      this.pb.authStore.clear();
      ctx.setState(userStateDefaults)
      this.router.navigate(['/login']);
    }

    @Selector()
    static getUserId(state: UserStateModel): string | null{
      return state.id;
    }

    @Selector()
    static getAvatarUrl(state: UserStateModel): string | null{
      return state.avatarUrl;
    }

    @Selector()
    static getUsername(state: UserStateModel): string | null{
      return state.username;
    }

    @Selector()
    static getEmail(state: UserStateModel): string | null{
      return state.email;
    }

    @Selector()
    static isLoggedIn(state: UserStateModel): boolean{
      return null != state.id;
    }
}