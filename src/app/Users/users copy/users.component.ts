import { Component } from '@angular/core'
import { AuthGuardService } from 'src/app/Core/services/auth/auth-guard.service'

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss'],
	providers: [AuthGuardService],
})
export class UsersComponent {}
