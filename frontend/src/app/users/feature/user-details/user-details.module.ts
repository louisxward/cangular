import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { UserListComponentRoutingModule } from './user-details-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { UserDetailsComponent } from './user-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserListComponentRoutingModule,
    FontAwesomeModule
  ],
  declarations: [UserDetailsComponent],
})
export class UserDetailsComponentModule {}