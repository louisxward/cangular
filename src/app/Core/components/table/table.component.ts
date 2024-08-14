import { Component, Input } from '@angular/core'

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> {
	@Input() columns: Array<{
		header: string
		field: string
		sortable?: boolean
	}> = []
	@Input() data: T[] = []
	@Input() showActions: boolean = false
	@Input() actions: Array<{ label: string; action: (item: T) => void }> = []

	sortData(column: any) {
		if (column.sortable) {
			// this.data.sort((a, b) => (a[column.field] > b[column.field] ? 1 : -1)) ToDo - Fixx
			return
		}
	}
}
