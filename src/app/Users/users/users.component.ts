import { Component } from '@angular/core';
import { AuthGuardService } from 'src/app/Core/services/auth/auth-guard.service'
import { PageHeaderComponent } from '..//../Core/components/page-header/page-header.component'
import { UserTableComponent } from '..//../Users/components/user-table/user-table.component'
import { DataTableComponent } from '..//../Core/components/data-table/data-table.component'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [AuthGuardService],
})
export class UsersComponent {

}
