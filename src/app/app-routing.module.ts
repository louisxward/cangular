import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'src/app/Home/home/home.component'
import { AboutComponent } from 'src/app/About/about/about.component'
import { UsersComponent } from 'src/app/Users/users/users.component'
import { UserDetailsComponent } from 'src/app/UserDetails/userDetails/userDetails.component'
import { ProfileComponent } from 'src/app/Profile/profile/profile.component'
import { LoginComponent } from 'src/app/Login/login/login.component'
import { PageNotFoundComponent } from 'src/app/PageNotFound/pageNotFound/pageNotFound.component'
import { AuthGuardService } from 'src/app/Core/services/auth/auth-guard.service'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'users/:userId',
    component: UserDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    //canActivate: [AuthGuard],ehhhh
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { 
    path: '**',
    pathMatch: 'full', 
    component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 


}
