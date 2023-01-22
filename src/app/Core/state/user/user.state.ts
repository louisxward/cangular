import { Injectable } from "@angular/core";
import { UserStateModel } from "./user.model";
import { State, Action, StateContext, Store, Selector } from "@ngxs/store";
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
    
    constructor(private store: Store){
    }
  
    @Action(User.AllNavbarActions.LoginFlowInitiated)
    login(ctx: StateContext<UserStateModel>) {
      console.log("login()")
      const myPromise = this.pb.collection('users').authWithPassword('louis', '12345')
      myPromise.then((value) => { 
        console.log("found user")
        console.log(value.record.id)
        ctx.setState({
          id: value.record.id
        });
        console.log(ctx.getState)
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
      console.log(ctx.getState)
    }

    @Selector()
    static getUserId(state: UserStateModel) {
      console.log("getUserId()")
      console.log(state)
      return state.id;
    }

    @Selector()
    static isLoggedIn(state: UserStateModel) {
      console.log("isLoggedIn()")
      console.log(state)
      return null != state.id;
    }
}