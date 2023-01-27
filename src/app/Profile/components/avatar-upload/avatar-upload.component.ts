import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/Core/services/upload/upload.service';


@Component({
  selector: 'app-avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.scss']
})

export class AvatarUploadComponent implements OnInit{

  constructor(private uploadService : UploadService){
  }
  
  ngOnInit(): void {
  }

  submit() {
  }
}
