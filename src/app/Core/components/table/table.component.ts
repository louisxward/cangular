import { Component, Input } from '@angular/core'
import { Action, Column, Search, TableSettings } from 'src/app/Core/state/table'

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
	@Input() loaded: boolean = false
	tempPageSize: number

	getColumnWidth(column: Column<T>): string {
		if (column.width == 0) {
			return ''
		}
		return column.width + '%'
	}

	updatePageSize(event: Event) {
		try {
			const selectedValue = Number((event.target as HTMLSelectElement).value)
			if (this.tableSettings.max != selectedValue) {
				this.tableSettings.pageSizeUpdate(selectedValue)
			}
		} catch (error) {
			console.error(error)
		}
	}

	getPages() {
		const pages: number[] = []
		for (let i: number = 0; i < this.tableSettings.pages; i++) {
			pages.push(i + 1)
		}
		return pages
	}

	sortData(column: Column<T>) {
		let newSortState = false
		if (column.sortState == null) {
			newSortState = true
		} else {
			newSortState = !column.sortState
		}
		if (column.sortable) {
			try {
				const field = String(column.field)
				this.resetAllSortStates()
				this.tableSettings.sortUpdate(field, newSortState)
				column.sortState = newSortState
			} catch (error) {
				console.error(error)
			}
		}
	}

	searchSubmit() {
		this.search.submit(this.search.form.value)
		this.search.form.markAsPristine()
	}

	resetAllSortStates() {
		for (let column of this.columns) {
			column.sortState = null
		}
	}
}
