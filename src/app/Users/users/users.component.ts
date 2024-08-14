import { Component } from '@angular/core'
import { UserList, UserService } from 'src/app/Core/services/user/user.service'

interface Column {
	header: string
	field: keyof UserList
	sortable?: boolean
}

interface Action {
	label: string
	action: (item: UserList) => void
}

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
	columns: Column[]
	data: UserList[]
	actions: Action[]

	max = 10
	size = 0
	page = 1
	pages = 0
	pageSizes = [10, 25, 50, 100]

	constructor(private userService: UserService) {
		this.columns = [
			{ header: 'ID', field: 'id', sortable: true },
			{ header: 'USERNAME', field: 'username', sortable: true },
			{ header: 'EMAIL', field: 'email', sortable: true },
		]
		this.actions = [
			{ label: 'Edit', action: (item: UserList) => this.editItem(item) },
			{ label: 'Delete', action: (item: UserList) => this.deleteItem(item) },
		]
	}

	ngOnInit(): void {
		this.userService.getResults(this.page, this.max, '').then((records) => {
			if (records) {
				this.size = records.totalItems
				this.pages = records.totalPages
				this.data = records.items
			}
		})
	}

	editItem(item: UserList) {
		console.log('Edit', item)
	}

	deleteItem(item: UserList) {
		console.log('Delete', item)
	}
}
