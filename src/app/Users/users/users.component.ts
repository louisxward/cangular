import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { QueryService } from 'src/app/Core/services/query/query.service'
import { UserList, UserService } from 'src/app/Core/services/user/user.service'
import {
	Action,
	Column,
	FormConfig,
	Search,
	TableSettings,
} from 'src/app/Core/state/table'

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
	tableSettings: TableSettings
	columns: Column<UserList>[]
	data: UserList[]
	search: Search
	actions: Action<UserList>[] = [] // ToDo do this on all. make this a reusbale comp too?
	showActions: boolean = false

	loaded: boolean = false
	filter: string = ''
	sort: string = ''
	defaultPagesSizes: number[] = [10, 25, 50, 100]

	constructor(
		private userService: UserService,
		private fb: FormBuilder,
		private queryService: QueryService,
		private router: Router
	) {
		this.createTableSettings()
		this.createColumnHeaders()
		this.createRowActions()
		this.createSearch()
	}

	ngOnInit(): void {
		this.getResults()
	}

	// Table Settings
	createTableSettings() {
		this.tableSettings = {
			max: this.defaultPagesSizes[0],
			size: 0,
			page: 1,
			pages: 1,
			pageSizes: this.defaultPagesSizes,
			pageSizeUpdate: (pageSize) => this.pageSizeUpdate(pageSize),
			pageUpdate: (page) => this.pageUpdate(page),
			sortUpdate: (field, sortState) => this.sortUpdate(field, sortState),
		}
	}

	// Columns Headers
	createColumnHeaders() {
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
	}

	// Row Actions
	createRowActions() {
		this.actions = [
			{ label: 'View', action: (record: UserList) => this.view(record) },
		]
		this.showActions = this.actions.length > 0
	}

	// Search
	createSearch() {
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
		const searchForm = this.createForm(searchFormConfigs)
		this.search = {
			form: searchForm,
			formConfigs: searchFormConfigs,
			submit: (formValue) => this.searchUpdate(formValue),
			reset: () => this.searchReset(),
		}
	}

	createForm(formConfigs: FormConfig[]) {
		const formGroup: Record<string, any[]> = {}
		formConfigs.forEach((field) => {
			formGroup[field.name] = [
				field.value || '',
				field.required ? Validators.required : null,
			]
		})
		const temp = this.fb.group(formGroup, {
			validator: this.atLeastOneFieldValidator,
		})
		return temp
	}

	atLeastOneFieldValidator(formGroup: FormGroup) {
		const controls = formGroup.controls
		if (Object.values(controls).some((control) => control.value)) {
			return null // valid
		} else {
			return { atLeastOneRequired: true } // invalid
		}
	}

	// Results
	async getResults() {
		this.loaded = false
		await this.userService
			.getResults(
				this.tableSettings.page,
				this.tableSettings.max,
				this.filter,
				this.sort
			)
			.then((records) => {
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

	// Table Update
	pageSizeUpdate(pageSize: number) {
		if (this.tableSettings.max != pageSize) {
			this.tableSettings.max = pageSize
			this.tableSettings.page = 1
			this.getResults()
		}
	}

	pageUpdate(page: number) {
		if (this.tableSettings.page != page) {
			this.tableSettings.page = page
			this.getResults()
		}
	}

	searchUpdate(formValue: { [key: string]: string | null }) {
		console.log('searchUpdate()')
		const newFilter = this.queryService.formatQueryAnd(formValue)
		if (this.filter != newFilter) {
			this.filter = newFilter
			this.getResults()
		}
	}

	sortUpdate(field: string, sortState: boolean) {
		const newSort = this.queryService.formatSort(field, sortState)
		if (this.sort != newSort) {
			this.sort = newSort
			this.getResults()
		}
	}

	searchReset() {
		this.search.form.reset()
		this.filter = ''
		this.getResults()
	}

	// Buttons
	view(record: UserList) {
		this.router.navigate(['users/', record.id])
	}

	create() {
		this.router.navigate(['users/', 0])
	}
}
