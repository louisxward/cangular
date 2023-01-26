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
import { SidebarComponent } from './Sidebar/sidebar/sidebar.component';
import { PageHeaderComponent } from './Core/components/page-header/page-header.component';
import { HomeComponent } from './Home/home/home.component';
import { AboutComponent } from './About/about/about.component';
import { UsersComponent } from './Users/users/users.component';
import { UserTableComponent } from './Users/components/user-table/user-table.component';
import { UserDetailsComponent } from './UserDetails/userDetails/userDetails.component';
import { UserFormComponent } from './UserDetails/components/user-form/user-form.component';
import { ProfileComponent } from './Profile/profile/profile.component';
import { LoginComponent } from './Login/login/login.component';
import { LoginFormComponent } from './Login/components/login-form/login-form.component';
import { PageNotFoundComponent } from './PageNotFound/pageNotFound/pageNotFound.component';
import { AuthGuardService } from './Core/services/auth/auth-guard.service'


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
    UserFormComponent,
    ProfileComponent,
    LoginComponent,
    LoginFormComponent,
    PageNotFoundComponent,
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
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
