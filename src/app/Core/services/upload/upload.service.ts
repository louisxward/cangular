import {  Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { NotificationService } from '../notification/notification.service';
import { ApiService } from 'src/app/Core/services/api/api.service';

@Injectable()
export class UploadService  {

  pb: PocketBase

  constructor(private notificationService: NotificationService, private apiService: ApiService) { 
    this.pb = apiService.pb
  }

  async upload(data: FormData, id: string) {
    console.log("upload() start")
    let fileName = ""
    const myPromise = this.pb.collection('users').update(id, data);
    await myPromise.then((value) => { 
      this.notificationService.success("file uploaded")
      fileName = value.avatar
    })
    .catch((error)=>{
      console.log(error)
      this.notificationService.error("upload failed")
    })
    console.log("upload() end")
    return fileName
  }

  async getFileUrl(userId: string, fileName: string): Promise<string> {
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

  deleteFile(userId: string, fileName: string, field: string){
    console.log("deleteFile()")
    this.pb.collection('users').update(userId, {'avatar': null});
    this.notificationService.success("file deleted") 
  }
}