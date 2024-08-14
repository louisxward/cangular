import { Component, Input } from '@angular/core'

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
