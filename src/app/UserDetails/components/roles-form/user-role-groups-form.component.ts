import { Component, Input, OnInit } from '@angular/core'
import { RoleService } from 'src/app/Core/services/role/role.service'
import { UserRoleGroup } from 'src/app/Core/state/user/user'

@Component({
	selector: 'app-user-role-groups-form',
	templateUrl: './user-role-groups-form.component.html',
	styleUrls: ['./user-role-groups-form.component.scss'],
})
export class UserRoleGroupsFormComponent implements OnInit {
	loaded: boolean = false
	@Input() userId: string

	userRoleGroups: UserRoleGroup[]

	constructor(private roleService: RoleService) {}

	async ngOnInit(): Promise<void> {
		this.userRoleGroups = await this.roleService.getUserRoleGroups(this.userId)
	}
}
