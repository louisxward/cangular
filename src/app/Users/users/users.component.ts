import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Action, Column } from 'src/app/Core/components/table/table.component'
import { QueryService } from 'src/app/Core/services/query/query.service'
import { UserList, UserService } from 'src/app/Core/services/user/user.service'

export interface TableSettings {
	max: number
	size: number
	page: number
	pages: number
	pageSizes: number[]
	pageSizeUpdate: (pageSize: number) => void
	pageUpdate: (page: number | null) => void
}

export interface Search {
	form: FormGroup
	formConfigs: FormConfig[]
	submit: (formValue: { [key: string]: string | null }) => void
	reset: () => void
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
	actions: Action<UserList>[] = [] // ToDo do this on all. make this a reusbale comp too?
	tableSettings: TableSettings
	showActions: boolean = false
	search: Search
	loaded: boolean = false
	filter: string = ''

	constructor(
		private userService: UserService,
		private fb: FormBuilder,
		private queryService: QueryService,
		private router: Router
	) {
		//column headers
		this.columns = [
			{ header: 'ID', field: 'id', sortable: true, sortState: null, width: 10 },
			{
				header: 'USERNAME',
				field: 'username',
				sortable: true,
				sortState: null,
				width: 20,
			},
			{
				header: 'EMAIL',
				field: 'email',
				sortable: true,
				sortState: null,
				width: 0,
			},
		]
		// row actions
		this.actions = [
			{ label: 'View', action: (record: UserList) => this.view(record) },
		]
		this.showActions = this.actions.length > 0
		// table settings ToDo alot of this can be defaulted in parent comp?
		this.tableSettings = {
			max: 10,
			size: 0,
			page: 1,
			pages: 1,
			pageSizes: [10, 25, 50, 100],
			pageSizeUpdate: (pageSize) => this.pageSizeUpdate(pageSize),
			pageUpdate: (page) => this.pageUpdate(page),
		}
		// searchConfig
		const searchFormConfigs: FormConfig[] = [
			{
				type: 'text',
				name: 'id',
				placeholder: 'ID',
				value: '',
				required: false,
			},
			{
				type: 'text',
				name: 'username',
				placeholder: 'USERNAME',
				value: '',
				required: false,
			},
		]
		const searchForm = this.initializeForm(searchFormConfigs)
		this.search = {
			form: searchForm,
			formConfigs: searchFormConfigs,
			submit: (formValue) => this.searchUpdate(formValue),
			reset: () => this.searchReset(),
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

	ngOnInit(): void {
		this.getResults()
	}

	async getResults() {
		this.loaded = false
		await this.userService
			.getResults(this.tableSettings.page, this.tableSettings.max, this.filter)
			.then((records) => {
				console.log(records)
				if (records) {
					this.tableSettings.page = records.page
					this.tableSettings.max = records.perPage
					this.tableSettings.size = records.totalItems
					this.tableSettings.pages = records.totalPages
					this.data = records.items
				}
			})
		this.loaded = true
	}

	view(record: UserList) {
		this.router.navigate(['users/', record.id])
	}

	create() {
		this.router.navigate(['users/', 0])
	}

	pageSizeUpdate(pageSize: number) {
		this.tableSettings.max = pageSize
		this.getResults()
	}

	pageUpdate(page: number | null) {
		if (page) {
			this.tableSettings.page = page
			this.getResults()
		}
	}

	searchUpdate(formValue: { [key: string]: string | null }) {
		this.filter = this.queryService.formatQueryAnd(formValue)
		this.getResults()
	}

	searchReset() {
		this.search.form.reset()
		this.filter = ''
		this.getResults()
	}
}
