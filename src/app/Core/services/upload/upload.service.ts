import {  Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { NotificationService } from '../notification/notification.service';
import { ApiService } from 'src/app/Core/services/api/api.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Injectable()
export class UploadService  {

  pb: PocketBase

  loader = this.loadingBarService.useRef();

  constructor(private notificationService: NotificationService, private apiService: ApiService, private loadingBarService: LoadingBarService) { 
    this.pb = apiService.pb
  }

  async upload(data: FormData, id: string) {
    console.log("upload() start")
    this.loader.start()
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
    this.loader.complete()
    return fileName
  }

  async getFileUrl(userId: string, fileName: string, thumbSize2: string | null): Promise<string> {
    console.log("getFileUrl()")
    let avatarUrl = ""
    let thumbSize = thumbSize2 ?? '';
    const myPromise = this.pb.collection('users').getOne(userId)
    //const url = pb.files.getUrl(record, firstFilename, {'thumb': '100x250'});
    await myPromise.then((value) => { 
      avatarUrl = this.pb.getFileUrl(value, fileName, {'thumb': thumbSize})
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