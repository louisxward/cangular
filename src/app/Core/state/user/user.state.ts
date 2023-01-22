import { Injectable } from "@angular/core";
import { UserStateModel } from "./user.model";
import { State, Action, StateContext, Store, Selector } from "@ngxs/store";
// import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';
import { User } from "./user.actions";
import PocketBase from 'pocketbase';

@State<UserStateModel>({
  name: "user",
  defaults: {
    id: null,
    avatar: null,
  },
})


@Injectable()
export class UserState {
    pb = new PocketBase('http://127.0.0.1:8090')
    
    constructor(private store: Store){}

    async getAvatarUrl(userId: string, fileName: string): Promise<string> {
      console.log("getAvatarUrl() start")
      const myPromise = this.pb.collection('users').getOne(userId)
      myPromise.then((value) => { 
        const send = this.pb.getFileUrl(value, fileName, {'thumb': '100x250'})
        console.log("promise.then")
        console.log(send)
        return send
      })
     .catch((error)=>{ 
        console.log("promise.catch")
        console.log(error)
        return ""
      })
      console.log("getAvatarUrl() finish")
      return ""
    }


    @Action(User.Login.LoginFlowInitiated)
    login(ctx: StateContext<UserStateModel>, action: User.Login.LoginFlowInitiated) {
      console.log("login()")
      const username = action.payload.username;
      const password = action.payload.password;
      const myPromise = this.pb.collection('users').authWithPassword(username, password)
      myPromise.then((value) => { 
        console.log("found user")
        this.store.dispatch(new User.Login.UpdateUser({id: value.record.id, avatar: value.record.avatar}));
      })
     .catch((error)=>{ 
        console.log(error)
      }) 
    }

    @Action(User.Login.UpdateUser)
    updateUser(ctx: StateContext<UserStateModel>, action: User.Login.UpdateUser) {
      console.log("updateUser()")
      const id = action.payload.id
      const avatarFileName = action.payload.avatar
      let avatarUrl = ""
      if(avatarFileName){
        const myPromise = this.getAvatarUrl(id, avatarFileName)
        myPromise.then((value) => { 
          console.log("found user")
          avatarUrl = value
        })
       .catch((error)=>{ 
          console.log(error)
        })
        
      }
      console.log("patch")
      ctx.patchState({
        id: id,
        avatar: avatarUrl
      })
      console.log(ctx.getState())
    }

    @Action(User.Login.LogoutFlowInitiated)
    logout(ctx: StateContext<UserStateModel>) {
      console.log("logOut()")
      this.pb.authStore.clear();
      ctx.patchState({
        id: null
      });
    }

    @Selector()
    static getUserId(state: UserStateModel): string | null{
      return state.id;
    }

    @Selector()
    static isLoggedIn(state: UserStateModel): boolean{
      return null != state.id;
    }
}