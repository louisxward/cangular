import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserListComponentRoutingModule } from './user-list-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { UserListComponent } from './user-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserListComponentRoutingModule,
    FontAwesomeModule
  ],
  declarations: [UserListComponent],
})
export class UserListComponentModule {}