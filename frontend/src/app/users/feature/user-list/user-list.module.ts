import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserListComponentRoutingModule } from './user-list-routing.module';

import { UserListComponent } from './user-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserListComponentRoutingModule
  ],
  declarations: [UserListComponent],
})
export class UserListComponentModule {}