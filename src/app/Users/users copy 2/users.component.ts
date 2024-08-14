import { Component } from '@angular/core'

interface Column {
	header: string
	field: keyof DataType
	sortable?: boolean
}

interface DataType {
	name: string
	age: number
	email: string
}

interface Action {
	label: string
	action: (item: DataType) => void
}

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
	columns: Column[] = [
		{ header: 'Name', field: 'name', sortable: true },
		{ header: 'Age', field: 'age', sortable: true },
		{ header: 'Email', field: 'email' },
	]

	data: DataType[] = [
		{ name: 'John Doe', age: 25, email: 'john.doe@example.com' },
		{ name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
		{ name: 'Mike Johnson', age: 35, email: 'mike.johnson@example.com' },
	]

	actions: Action[] = [
		{ label: 'Edit', action: (item: DataType) => this.editItem(item) },
		{ label: 'Delete', action: (item: DataType) => this.deleteItem(item) },
	]

	editItem(item: DataType) {
		console.log('Edit', item)
	}

	deleteItem(item: DataType) {
		console.log('Delete', item)
	}
}
