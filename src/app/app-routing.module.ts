import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/Home/home/home.component'
import { AboutComponent } from 'src/app/About/about/about.component'
import { UsersComponent } from 'src/app/Users/users/users.component'
import { UserDetailsComponent } from 'src/app/UserDetails/userDetails/userDetails.component'
import { ProfileComponent } from 'src/app/Profile/profile/profile.component'
import { LoginComponent } from 'src/app/Login/login/login.component'

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
  },
  {
    path: 'users/:userId',
    component: UserDetailsComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
