import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserState } from "./Core/state";

import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';


import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";


import { AppComponent } from './app.component';
import { HomeComponent } from './Home/home/home.component';
import { SidebarComponent } from './Sidebar/sidebar/sidebar.component';
import { AboutComponent } from './About/about/about.component';
import { PageHeaderComponent } from './Core/components/page-header/page-header.component';
import { UserTableComponent } from './Users/components/user-table/user-table.component';
import { UsersComponent } from './Users/users/users.component';
import { UserDetailsComponent } from './UserDetails/userDetails/userDetails.component';
import { ProfileComponent } from './Profile/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    AboutComponent,
    PageHeaderComponent,
    UsersComponent,
    UserTableComponent,
    UserDetailsComponent,
    ProfileComponent
  ],
  imports: [
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([UserState], {
      developmentMode: true
    }),
    NgxsStoragePluginModule.forRoot({key: 'user'}),

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
