import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../user-list/user-list.module').then(
        (m) => m.UserListComponentModule
      ),
  },
  {
    path: ':id',
    loadChildren: () =>
      import('../user-details/user-details.module').then(
        (m) => m.UserDetailsComponentModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserShellRoutingModule {}