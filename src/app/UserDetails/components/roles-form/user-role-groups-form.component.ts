import { Component, Input, OnInit } from '@angular/core'
import { RoleService } from 'src/app/Core/services/role/role.service'
import { RoleGroup } from 'src/app/Core/state/role/role'

@Component({
	selector: 'app-user-role-groups-form',
	templateUrl: './user-role-groups-form.component.html',
	styleUrls: ['./user-role-groups-form.component.scss'],
})
export class UserRoleGroupsFormComponent implements OnInit {
	loaded: boolean = false
	@Input() userId: string

	roleGroups: RoleGroup[] = []

	constructor(private roleService: RoleService) {}

	async ngOnInit(): Promise<void> {
		this.roleGroups = await this.roleService.getRoleGroups(this.userId)
	}

	getEnumName(roleGroup: RoleGroup): string {
		return RoleGroup[roleGroup]
	}
}
