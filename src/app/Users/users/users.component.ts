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

export interface TableSettings {
	max: number
	size: number
	page: number
	pages: number
	pageSizes: number[]
	pageUpdate: (pageSize: number) => void
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
	tableSettings: TableSettings
	showActions: boolean

	constructor(private userService: UserService) {
		this.columns = [
			{ header: 'ID', field: 'id', sortable: true },
			{ header: 'USERNAME', field: 'username', sortable: true },
			{ header: 'EMAIL', field: 'email', sortable: true },
		]
		this.showActions = true
		this.actions = [
			{ label: 'Edit', action: (item: UserList) => this.editItem(item) },
			{ label: 'Delete', action: (item: UserList) => this.deleteItem(item) },
		]
		this.tableSettings = {
			max: 10,
			size: 0,
			page: 1,
			pages: 0,
			pageSizes: [10, 25, 50, 100],
			pageUpdate: (pageSize) => this.pageUpdate(pageSize),
		}
	}

	ngOnInit(): void {
		this.getResults()
	}

	getResults() {
		this.userService
			.getResults(this.tableSettings.page, this.tableSettings.max, '')
			.then((records) => {
				if (records) {
					this.tableSettings.size = records.totalItems
					this.tableSettings.pages = records.totalPages
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

	pageUpdate(pageSize: number) {
		console.log('pageSize', pageSize)
		this.tableSettings.max = pageSize
		this.getResults()
	}
}
