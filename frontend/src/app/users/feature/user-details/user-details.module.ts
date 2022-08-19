import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserListComponentRoutingModule } from './user-details-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { UserDetailsComponent } from './user-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserListComponentRoutingModule,
    FontAwesomeModule
  ],
  declarations: [UserDetailsComponent],
})
export class UserDetailsComponentModule {}