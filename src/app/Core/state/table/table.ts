import { FormGroup } from '@angular/forms'

export interface TableSettings {
	max: number
	size: number
	page: number
	pages: number
	pageSizes: number[]
	pageSizeUpdate: (pageSize: number) => void
	pageUpdate: (page: number) => void
	sortUpdate: (field: string, sortState: boolean) => void
}

export interface Search {
	form: FormGroup
	formConfigs: FormConfig[]
	submit: (formValue: { [key: string]: string | null }) => void
	reset: () => void
}

export interface FormConfig {
	type: string
	label?: string
	name: string
	placeholder: string
	value: string | boolean
	required: boolean
}

export interface Column<T> {
	header: string
	field: keyof T
	sortable: boolean
	sortState: boolean | null
	width: number
}

export interface Action<T> {
	label: string
	action: (item: T) => void
}
