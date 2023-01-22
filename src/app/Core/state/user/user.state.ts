import { Injectable } from "@angular/core";
import { UserStateModel } from "./user.model";
import { State, Action, StateContext, Store, Selector } from "@ngxs/store";
import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';
import { User } from "./user.actions";
import PocketBase from 'pocketbase';




@State<UserStateModel>({
  name: "user",
  defaults: {
    id: null,
  },
})


@Injectable()
export class UserState {
    pb = new PocketBase('http://127.0.0.1:8090')
    
    constructor(){
    }
  
    @Action(User.AllNavbarActions.LoginFlowInitiated)
    login(ctx: StateContext<UserStateModel>) {
      console.log("login()")
      const myPromise = this.pb.collection('users').authWithPassword('louis', '12345')
      myPromise.then((value) => { 
        console.log("found user")
        ctx.setState(
          patch<UserStateModel>({
            id: value.record.id
          })
        );
        console.log(ctx.getState())
      })
     .catch((error)=>{ 
        console.log(error)
      }) 
    }
  
    @Action(User.AllNavbarActions.LogoutFlowInitiated)
    logout(ctx: StateContext<UserStateModel>) {
      console.log("logOut()")
      this.pb.authStore.clear();
      ctx.patchState({
        id: null
      });
    }

    @Selector()
    static getUserId(state: UserStateModel) {
      return state.id;
    }

    @Selector()
    static isLoggedIn(state: UserStateModel) {
      return null != state.id;
    }
}