import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
// States
import { AuthState, UserState } from './Core/state'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin'
import { NgxsModule } from '@ngxs/store'
import { AppRoutingModule } from './app-routing.module'

//import { LoadingBarRouterModule } from '@ngx-loading-bar/router'; not inuse as of yet
import { LoadingBarModule } from '@ngx-loading-bar/core'

import { ToastrModule, ToastrService } from 'ngx-toastr'
import { AboutComponent } from './About/about/about.component'
import { AppComponent } from './app.component'
import { LoadingBarComponent } from './Core/components/loading-bar/loading-bar.component'
import { PageHeaderComponent } from './Core/components/page-header/page-header.component'
import { SidebarComponent } from './Core/components/sidebar/sidebar.component'
import { TableComponent } from './Core/components/table/table.component'
import { ApiService } from './Core/services/api/api.service'
import { AuthGuardService } from './Core/services/auth/auth-guard.service'
import { ErrorService } from './Core/services/error/error.service'
import { FormService } from './Core/services/form/form.service'
import { LoadingBarService } from './Core/services/loading-bar/loading-bar.service'
import { LoginService } from './Core/services/login/login.service'
import { NotificationService } from './Core/services/notification/notification.service'
import { QueryService } from './Core/services/query/query.service'
import { RoleService } from './Core/services/role/role.service'
import { SocialService } from './Core/services/social/social.service'
import { UploadService } from './Core/services/upload/upload.service'
import { UserService } from './Core/services/user/user.service'
import { HomeComponent } from './Home/home/home.component'
import { LoginFormComponent } from './Login/components/login-form/login-form.component'
import { LoginComponent } from './Login/login/login.component'
import { PageNotFoundComponent } from './PageNotFound/pageNotFound/pageNotFound.component'
import { AvatarUploadComponent } from './Profile/components/avatar-upload/avatar-upload.component'
import { ProfileComponent } from './Profile/profile/profile.component'
import { UserRoleGroupsFormComponent } from './UserDetails/components/roles-form/user-role-groups-form.component'
import { UserFormComponent } from './UserDetails/components/user-form/user-form.component'
import { UserDetailsComponent } from './UserDetails/userDetails/userDetails.component'
import { UsersComponent } from './Users/users/users.component'

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		SidebarComponent,
		LoadingBarComponent,
		AboutComponent,
		PageHeaderComponent,
		UsersComponent,
		TableComponent,
		UserDetailsComponent,
		UserFormComponent,
		ProfileComponent,
		AvatarUploadComponent,
		LoginComponent,
		LoginFormComponent,
		PageNotFoundComponent,
		UserRoleGroupsFormComponent,
	],
	imports: [
		NgxsReduxDevtoolsPluginModule.forRoot(),
		NgxsModule.forRoot([UserState, AuthState], {
			developmentMode: isDevMode(),
		}),
		NgxsStoragePluginModule.forRoot({ key: ['user', 'auth'] }),
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		NgbModule,
		FormsModule,
		ReactiveFormsModule,
		ToastrModule.forRoot({ maxOpened: 5 }),
		//LoadingBarRouterModule,
		LoadingBarModule,
	],
	providers: [
		ApiService,
		AuthGuardService,
		LoadingBarService,
		LoginService,
		UserService,
		NotificationService,
		ToastrService,
		UploadService,
		SocialService,
		QueryService,
		ErrorService,
		FormService,
		RoleService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
