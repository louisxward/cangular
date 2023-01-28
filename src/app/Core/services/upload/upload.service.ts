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
    console.log("ID:" + id)
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
    console.log("fileName: " + fileName)
    console.log("upload() end")
    return fileName
  }
}