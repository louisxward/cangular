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
    login() {
        this.pb.collection('users').authWithPassword('louis', '12345')
    }
  
    @Action(User.AllNavbarActions.LogoutFlowInitiated)
    logout() {
      this.pb.authStore.clear();
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