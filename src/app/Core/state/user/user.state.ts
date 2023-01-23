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
    avatarUrl: null,
  },
})


@Injectable()
export class UserState {
    pb = new PocketBase('http://127.0.0.1:8090')
    
    constructor(private store: Store){}

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
    async updateUser(ctx: StateContext<UserStateModel>, action: User.Login.UpdateUser) {
      console.log("updateUser()")
      const id = action.payload.id
      const avatarFileName = action.payload.avatar
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
        avatarUrl: avatarUrl
      })
    }

    @Action(User.Login.LogoutFlowInitiated)
    logout(ctx: StateContext<UserStateModel>) {
      console.log("logOut()")
      this.pb.authStore.clear();
      ctx.patchState({
        id: null,
        avatarUrl: null
      });
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
    static isLoggedIn(state: UserStateModel): boolean{
      return null != state.id;
    }
}