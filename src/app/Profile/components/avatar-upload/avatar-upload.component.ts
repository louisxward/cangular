import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/Core/services/upload/upload.service';
import { AuthGuardService } from 'src/app/Core/services/auth/auth-guard.service';
import { Store } from "@ngxs/store";
import { User, UserState } from "src/app/Core/state/user";

@Component({
  selector: 'app-avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.scss']
})

export class AvatarUploadComponent implements OnInit{

  loading: boolean = false;
  pending: boolean = false;
  file: File = new File([],"",{});


  constructor(private store: Store, private uploadService: UploadService, private authGuardService: AuthGuardService) { }

  ngOnInit(): void {
  }

  onChange(event: any) {
      this.file = event.target.files[0];
      this.pending = true;
  }

  async onUpload() {
    console.log("onUpload()")
    this.loading = true;
    let fileName = ""
    const formData = new FormData();
    formData.append("avatar", this.file);
    await this.uploadService.upload(formData, this.authGuardService.userId).then((value: string) => fileName = value)
    this.store.dispatch(
      new User.UpdateAvatar({
        id: this.authGuardService.userId,
        fileName: fileName
      }))
    this.loading = false
    this.pending = false
    this.file = new File([],"",{});
    }
}
