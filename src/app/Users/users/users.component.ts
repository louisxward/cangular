import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
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

export interface Search {
	searchForm: FormGroup
	searchUpdate: (filter: string) => void
	formConfigs: FormConfig[]
}

export interface FormConfig {
	type: string
	label: string
	name: string
	placeholder: string
	value: string | boolean
	required: boolean
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
	search: Search
	formConfigs: FormConfig[]
	form: FormGroup
	loaded: boolean = false

	constructor(private userService: UserService, private fb: FormBuilder) {
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
		this.formConfigs = [
			{
				type: 'text',
				label: 'First Name',
				name: 'firstName',
				placeholder: 'Enter your first name',
				value: '',
				required: true,
			},
			{
				type: 'checkbox',
				label: 'Agree to Terms',
				name: 'terms',
				placeholder: 'Agree to Terms',
				value: false,
				required: true,
			},
		]
		this.initializeForm()
		this.search = {
			searchForm: this.form,
			searchUpdate: (filter) => this.searchUpdate(filter),
			formConfigs: this.formConfigs,
		}
	}

	initializeForm() {
		const formGroup: Record<string, any[]> = {}
		this.formConfigs.forEach((field) => {
			formGroup[field.name] = [
				field.value || '',
				field.required ? Validators.required : null,
			]
		})
		this.form = this.fb.group(formGroup)
	}

	async ngOnInit(): Promise<void> {
		await this.getResults()
		this.loaded = true
	}

	async getResults() {
		await this.userService
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

	searchUpdate(filter: string) {
		console.log('filter', filter)
	}
}
