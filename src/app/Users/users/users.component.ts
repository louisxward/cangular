import { Component } from '@angular/core'

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
	columns = [
		{ header: 'Name', field: 'name', sortable: true },
		{ header: 'Age', field: 'age', sortable: true },
		{ header: 'Email', field: 'email' },
	]

	data = [
		{ name: 'John Doe', age: 25, email: 'john.doe@example.com' },
		{ name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
		{ name: 'Mike Johnson', age: 35, email: 'mike.johnson@example.com' },
	]

	actions = [
		{ label: 'Edit', action: (item: any) => this.editItem(item) },
		{ label: 'Delete', action: (item: any) => this.deleteItem(item) },
	]

	editItem(item: any) {
		console.log('Edit', item)
	}

	deleteItem(item: any) {
		console.log('Delete', item)
	}
}
