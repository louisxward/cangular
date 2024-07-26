import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { UserState } from './Core/state'
import { NgxsModule } from '@ngxs/store'
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin'
import { AppRoutingModule } from './app-routing.module'
import { ReactiveFormsModule } from '@angular/forms'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'

//import { LoadingBarRouterModule } from '@ngx-loading-bar/router'; not inuse as of yet
import { LoadingBarModule } from '@ngx-loading-bar/core'


import { AppComponent } from './app.component';
import { SidebarComponent } from './Sidebar/sidebar/sidebar.component';
import { PageHeaderComponent } from './Core/components/page-header/page-header.component';
import { DataTableComponent } from './Core/components/data-table/OLD/data-table.component';
import { DataTableWrapperComponent } from './Core/components/data-table/data-table-wrapper.component';
import { HomeComponent } from './Home/home/home.component';
import { AboutComponent } from './About/about/about.component';
import { UsersComponent } from './Users/users/users.component';
import { UserTableComponent } from './Users/components/user-table/user-table.component';
import { UserDetailsComponent } from './UserDetails/userDetails/userDetails.component';
import { UserFormComponent } from './UserDetails/components/user-form/user-form.component';
import { ProfileComponent } from './Profile/profile/profile.component';
import { AvatarUploadComponent } from './Profile/components/avatar-upload/avatar-upload.component';
import { LoginComponent } from './Login/login/login.component';
import { LoginFormComponent } from './Login/components/login-form/login-form.component';
import { ApiService } from './Core/services/api/api.service';
import { SocialService } from './Core/services/social/social.service';
import { LoginService } from './Core/services/login/login.service';
import { QueryService } from './Core/services/query/query.service';
import { PageNotFoundComponent } from './PageNotFound/pageNotFound/pageNotFound.component';
import { AuthGuardService } from './Core/services/auth/auth-guard.service';
import { UploadService } from './Core/services/upload/upload.service';
import { NotificationService } from './Core/services/notification/notification.service';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';

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
    AvatarUploadComponent,
    LoginComponent,
    LoginFormComponent,
    PageNotFoundComponent,
    DataTableComponent,
    DataTableWrapperComponent,
  ],
  imports: [
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([UserState], {
      developmentMode: isDevMode()
    }),
    NgxsStoragePluginModule.forRoot({key: 'user'}),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({}),
    //LoadingBarRouterModule,
    LoadingBarModule
  ],
  providers: [ApiService, AuthGuardService, LoginService, NotificationService, ToastrService, UploadService, SocialService, QueryService,],
  bootstrap: [AppComponent]
})
export class AppModule {}
