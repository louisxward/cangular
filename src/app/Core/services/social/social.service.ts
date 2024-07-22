import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import PocketBase from 'pocketbase'
import { environment } from 'src/environment/environment';
import { ApiService } from 'src/app/Core/services/api/api.service';

@Injectable()
export class SocialService {

    pb: PocketBase

    constructor(private store: Store,  private apiService: ApiService,) { 
        this.pb = apiService.pb
    }

    async follow(userId: string, followUserId: string){
        let followingId = ""
        if(userId == "" || followUserId == "") return followingId
        const myPromise = this.pb.collection('user_follows').create({user: userId, follows_user: followUserId});
        await myPromise.then((value) => { 
            console.log("followed!")
            followingId = value.id
        })
        .catch((error)=>{
            console.log(error)
        })
        return followingId
    }

    async unfollow(followingId: string){
        if(followingId == "") return followingId
        const myPromise = this.pb.collection('user_follows').delete(followingId);
        await myPromise.then((value) => { 
            console.log("unfollowed!")
            followingId = ""
        })
        .catch((error)=>{
            console.log(error)
        })
        return followingId
    }

    async checkFollowing(userId: string, followUserId: string){
        let followingId = ""
        if(userId == "" || followUserId == "") return followingId
        const query = "user='".concat(userId+"' && follows_user='").concat(followUserId+"'")
        const myPromise = this.pb.collection('user_follows').getFirstListItem(query, {});
        await myPromise.then((value) => { 
            followingId = value.id
        })
        .catch((error)=>{
            console.log(error)
        })
        return followingId
    }

}