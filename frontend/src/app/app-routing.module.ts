import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/feature/home.page.component';
import { UserListComponent } from './users/feature/user-list/user-list.component';


const routes: Routes = [
  {
    path: 'home', component: HomePageComponent
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/feature/user-shell/user-shell.module').then(
        (m) => m.UserShellModule
      ),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
