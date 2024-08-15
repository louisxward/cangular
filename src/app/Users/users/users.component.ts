import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Action, Column } from 'src/app/Core/components/table/table.component'
import { UserList, UserService } from 'src/app/Core/services/user/user.service'

export interface TableSettings {
	max: number
	size: number
	page: number
	pages: number
	pageSizes: number[]
	pageUpdate: (pageSize: number) => void
}

export interface Search {
	form: FormGroup
	formConfigs: FormConfig[]
	submit: (filter: string) => void
}

export interface FormConfig {
	type: string
	// label: string
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
	columns: Column<UserList>[]
	data: UserList[]
	actions: Action<UserList>[] = []
	tableSettings: TableSettings
	showActions: boolean = false
	search: Search
	loaded: boolean = false
	filter: string = ''

	constructor(private userService: UserService, private fb: FormBuilder) {
		//column headers
		this.columns = [
			{ header: 'ID', field: 'id', sortable: true },
			{ header: 'USERNAME', field: 'username', sortable: true },
			{ header: 'EMAIL', field: 'email', sortable: true },
		]
		// row actions
		this.actions = [
			{ label: 'View', action: (item: UserList) => this.viewItem(item) },
		]
		this.showActions = this.actions.length > 0
		// table settings
		this.tableSettings = {
			max: 10,
			size: 0,
			page: 1,
			pages: 0,
			pageSizes: [10, 25, 50, 100],
			pageUpdate: (pageSize) => this.pageUpdate(pageSize),
		}
		// searchConfig
		const searchFormConfigs: FormConfig[] = [
			{
				type: 'text',
				name: 'id',
				placeholder: 'ID',
				value: '',
				required: true,
			},
		]
		const searchForm = this.initializeForm(searchFormConfigs)
		this.search = {
			form: searchForm,
			formConfigs: searchFormConfigs,
			submit: (filter) => this.searchUpdate(filter),
		}
	}

	initializeForm(formConfigs: FormConfig[]) {
		const formGroup: Record<string, any[]> = {}
		formConfigs.forEach((field) => {
			formGroup[field.name] = [
				field.value || '',
				field.required ? Validators.required : null,
			]
		})
		return this.fb.group(formGroup)
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

	viewItem(item: UserList) {
		console.log('Edit', item)
	}

	pageUpdate(pageSize: number) {
		console.log('pageSize', pageSize)
		this.tableSettings.max = pageSize
		this.getResults()
	}

	searchUpdate(filter: string) {
		console.log('filter', filter)
		this.filter = filter
	}
}
