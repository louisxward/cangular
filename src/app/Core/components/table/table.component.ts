import { Component, Input } from '@angular/core'
import { Search, TableSettings } from 'src/app/Users/users/users.component'

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> {
	@Input() columns: Array<{
		header: string
		field: keyof T
		sortable?: boolean
	}> = []
	@Input() data: T[] = []
	@Input() showActions: boolean = false
	@Input() actions: Array<{ label: string; action: (item: T) => void }> = []
	@Input() tableSettings: TableSettings //ToDo - This isnt required when including comp?
	@Input() search: Search //ToDo - This isnt required when including comp?

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
