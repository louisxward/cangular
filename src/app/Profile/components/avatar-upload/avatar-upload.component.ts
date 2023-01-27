import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/Core/services/upload/upload.service';


@Component({
  selector: 'app-avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.scss']
})

export class AvatarUploadComponent implements OnInit{


  formData = new FormData();

  fileToUpload: File | null = null;
  
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.upload(this.fileToUpload)

  }

  upload(fileToUpload: File){
    this.formData.append('fileKey', fileToUpload, fileToUpload.name);//<<<!<!<!<>!>!>!>!>!>>>!>!>!!>?!?!??!
  }

  constructor(private uploadService : UploadService){
  }
  
  ngOnInit(): void {
  }

  submit() {
  }
}
