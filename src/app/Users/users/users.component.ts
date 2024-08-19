import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { LoadingBarService } from '@ngx-loading-bar/core'
import { LoadingBarState } from '@ngx-loading-bar/core/loading-bar.state'
import { FormService } from 'src/app/Core/services/form/form.service'
import { QueryService } from 'src/app/Core/services/query/query.service'
import { UserService } from 'src/app/Core/services/user/user.service'
import {
	Action,
	Column,
	FormConfig,
	Search,
	TableSettings,
} from 'src/app/Core/state/table/table'
import { UserList } from 'src/app/Core/state/user/user'

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
	actions: Action<UserList>[] = []
	showActions: boolean = false

	loader: LoadingBarState
	loaded: boolean = false
	filter: string = ''
	sort: string = ''
	defaultPagesSizes: number[] = [10, 25, 50, 100]

	constructor(
		private userService: UserService,
		private queryService: QueryService,
		private router: Router,
		private formService: FormService,
		private loadingBarService: LoadingBarService
	) {
		this.loader = this.loadingBarService.useRef()
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
		this.search = {
			form: this.formService.createSearchForm(searchFormConfigs),
			formConfigs: searchFormConfigs,
			submit: (formValue) => this.searchUpdate(formValue),
			reset: () => this.searchReset(),
		}
	}

	// Results
	async getResults() {
		this.loaded = false
		this.loader.start()
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
		this.loader.complete()
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
