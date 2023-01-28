import {  Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class UploadService  {

  pb = new PocketBase('http://127.0.0.1:8090')

  constructor(private notificationService: NotificationService) {
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
    this.pb.collection('users').update(userId, {field: null});
  }
}