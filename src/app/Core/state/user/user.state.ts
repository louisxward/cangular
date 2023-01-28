import { Injectable } from "@angular/core";
import { UserStateModel } from "./user.model";
import { State, Action, StateContext, Store, Selector } from "@ngxs/store";
import { User } from "./user.actions";
import PocketBase from 'pocketbase';
import { Router } from "@angular/router";
import { UploadService } from "../../services/upload/upload.service";

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
    
    constructor(private store: Store, private router: Router,private uploadService: UploadService ){}


    //actions
    @Action(User.Login.Login)
    login(ctx: StateContext<UserStateModel>, action: User.Login.Login) {
      const record = action.payload.record
      this.store.dispatch(new User.Update.User({id: record.id, avatar: record.avatar, username: record.username, email: record.email}));
    }

    @Action(User.Login.Logout)
    logout(ctx: StateContext<UserStateModel>) {
      console.log("logOut()")
      this.pb.authStore.clear();
      ctx.setState(userStateDefaults)
      this.router.navigate(['/login']);
    }

    @Action(User.Update.User)
    async updateUser(ctx: StateContext<UserStateModel>, action: User.Update.User) {
      const id = action.payload.id
      const avatarFileName = action.payload.avatar
      const username = action.payload.username
      const email = action.payload.email
      let avatarUrl = ""
      if(avatarFileName){
        await this.uploadService.getFileUrl(id, avatarFileName).then((value: string) => avatarUrl = value)
      }
      ctx.patchState({
        id: id,
        avatarUrl: avatarUrl,
        username: username,
        email: email,
      })
    }

    @Action(User.Update.Avatar)
    async updateAvatar(ctx: StateContext<UserStateModel>, action: User.Update.Avatar) {
      const id = action.payload.id
      const fileName = action.payload.fileName
      let avatarUrl = ""
      await this.uploadService.getFileUrl(id, fileName).then((value: string) => avatarUrl = value)
      ctx.patchState({
        id: id,
        avatarUrl: avatarUrl,
      })
    }


    //selectors
    @Selector()
    static getUserId(state: UserStateModel): string{
      if(null != state.id){
        return state.id;
      }
      return ""
    }

    @Selector()
    static getAvatarUrl(state: UserStateModel): string{
      if(null != state.avatarUrl){
        return state.avatarUrl;
      }
      return ""
    }

    @Selector()
    static getUsername(state: UserStateModel): string{
      if(null != state.username){
        return state.username;
      }
      return ""
    }

    @Selector()
    static getEmail(state: UserStateModel): string{
      if(null != state.email){
        return state.email;
      }
      return ""
    }

    @Selector()
    static isLoggedIn(state: UserStateModel): boolean{
      return null != state.id;
    }
}