import { Component, Input } from '@angular/core'
import { Search, TableSettings } from 'src/app/Users/users/users.component'

interface column<T> {
	header: string
	field: keyof T
	sortable?: boolean
}

interface Action<T> {
	label: string
	action: (item: T) => void
}
@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> {
	@Input() columns: column<T>[] = []
	@Input() data: T[] = []
	@Input() showActions: boolean = false
	@Input() actions: Action<T>[] = []
	@Input() tableSettings: TableSettings //ToDo - This isnt required when including comp?
	@Input() search: Search

	sortData(column: { header: string; field: keyof T; sortable?: boolean }) {
		if (column.sortable) {
			this.data.sort((a, b) => {
				const field = column.field
				const aValue = a[field]
				const bValue = b[field]

				if (aValue < bValue) {
					return -1
				} else if (aValue > bValue) {
					return 1
				} else {
					return 0
				}
			})
		}
	}
}
