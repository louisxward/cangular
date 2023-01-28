import {  Injectable } from '@angular/core';

import PocketBase from 'pocketbase';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class UploadService  {

  pb = new PocketBase('http://127.0.0.1:8090')

  constructor(private notificationService: NotificationService) {
  }

  async upload(data: FormData, id: string): Promise<boolean> {
    const myPromise = this.pb.collection('users').update(id, data);
    await myPromise.then((value) => { 
      console.log("file uploaded")
      this.notificationService.success("file uploaded")
      return false
    })
    .catch((error)=>{
      console.log(error)
      this.notificationService.error("upload failed")
      return false
    })
    return false;
  }

  
  
}