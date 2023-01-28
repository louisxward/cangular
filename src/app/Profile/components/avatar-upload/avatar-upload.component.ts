import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/Core/services/upload/upload.service';
import { AuthGuardService } from 'src/app/Core/services/auth/auth-guard.service';
import { Store } from "@ngxs/store";
import { UserState } from "src/app/Core/state/user";

@Component({
  selector: 'app-avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.scss']
})

export class AvatarUploadComponent implements OnInit{

  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File = new File([],"",{}); // Variable to store file

  // Inject service 
  constructor(private store: Store, private uploadService: UploadService, private authGuardService: AuthGuardService) { }

  ngOnInit(): void {
  }

  // On file Select
  onChange(event: any) {
      this.file = event.target.files[0];
  }

  // OnClick of button Upload
  async onUpload() {
      this.loading = true;
      console.log(this.file);
      const formData = new FormData();
      formData.append("avatar", this.file);
      //this.uploadService.upload(formData, this.authGuardService.userId).then((value: boolean) => this.loading)
      await this.uploadService.upload(formData, this.authGuardService.userId)
      this.loading = false
  }

}
