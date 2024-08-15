import { Component, Input } from '@angular/core'
import { Search, TableSettings } from 'src/app/Users/users/users.component'

export interface Column<T> {
	header: string
	field: keyof T
	sortable: boolean
	sortState: boolean | null // ToDo this can be done better atm null none true asc false dsc
}

export interface Action<T> {
	label: string
	action: (item: T) => void
}

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> {
	@Input() columns: Column<T>[] = []
	@Input() data: T[] = []
	@Input() showActions: boolean = false
	@Input() actions: Action<T>[] = []
	@Input() tableSettings: TableSettings //ToDo - This isnt required when including comp?
	@Input() search: Search

	sortData(column: Column<T>) {
		if (column.sortable) {
			const sortState = column.sortState
			console.log(sortState)
			if (sortState == null) {
				this.data.sort((a, b) => {
					const field = column.field
					const aValue = a[field]
					const bValue = b[field]
					column.sortState = true
					if (aValue < bValue) {
						return -1
					} else if (aValue > bValue) {
						return 1
					} else {
						return 0
					}
				})
			} else if (sortState == true) {
				this.data.sort((b, a) => {
					const field = column.field
					const aValue = a[field]
					const bValue = b[field]
					column.sortState = false
					if (aValue < bValue) {
						return -1
					} else if (aValue > bValue) {
						return 1
					} else {
						return 0
					}
				})
			} else if (sortState == false) {
				// ToDo - Figure out how to reset sort
				this.data.sort((a, b) => {
					const field = column.field
					const aValue = a[field]
					const bValue = b[field]
					column.sortState = null
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
}
