import { Component } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { LoadingBarService } from '@ngx-loading-bar/core'
import { LoadingBarState } from '@ngx-loading-bar/core/loading-bar.state'
import { QueryService } from 'src/app/Core/services/query/query.service'
import { UserService } from 'src/app/Core/services/user/user.service'

export interface userTableItem {
	id: number
	username: string
	email: string
}

@Component({
	selector: 'app-user-table',
	templateUrl: './user-table.component.html',
	styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
	loader: LoadingBarState

	pagnationForm: FormGroup
	searchForm: FormGroup
	results: any[] = []
	loaded = false

	query = ''
	max = 10
	size = 0
	page = 1
	pages = 0
	pageSizes = [10, 25, 50, 100]

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private loadingBarService: LoadingBarService,
		private queryService: QueryService,
		private userService: UserService
	) {
		this.loader = this.loadingBarService.useRef()
	}

	ngOnInit(): void {
		this.pagnationForm = this.fb.group({
			max: 10,
			page: 1,
		})
		this.searchForm = this.fb.group({
			id: '',
			username: '',
		})
		this.searchForm.setValidators(this.atLeastOneValidator())
		this.getResults()
		this.pagnationForm.get('max')?.valueChanges.subscribe((max) => {
			this.updateMax(max)
		})
	}

	ngOnDestroy() {
		this.loader.complete()
	}

	private atLeastOneValidator = () => {
		return (controlGroup: any) => {
			let controls = controlGroup.controls
			if (controls) {
				let theOne = Object.keys(controls).find((key) => controls[key].value !== '')
				if (!theOne) {
					return {
						atLeastOneRequired: {
							text: 'At least one should be selected',
						},
					}
				}
			}
			return null
		}
	}

	getResults() {
		this.loader.start()
		this.userService
			.getResults(this.page, this.max, this.query)
			.then((records) => {
				if (records) {
					this.size = records.totalItems
					this.pages = records.totalPages
					this.results = records.items
				}
				this.loaded = true
				this.loader.complete()
			})
	}

	updateMax(max: number) {
		this.max = max
		this.getResults()
	}

	updatePage(page: number) {
		if (this.page != page) {
			this.pagnationForm.value.page = page
			this.page = page
			this.getResults()
		}
	}

	getPages(): number[] {
		const pages = []
		for (let x = 1; x <= this.pages; x++) {
			pages.push(x)
		}
		return pages
	}

	submit() {}

	searchSubmit() {
		console.log(this.searchForm.value)
		this.query = this.queryService.formatQuery(
			JSON.stringify(this.searchForm.value)
		)
		this.getResults()
	}

	searchReset() {
		this.query = ''
		this.searchForm.reset()
		let obj = { id: '', username: '' }
		this.searchForm.patchValue(obj)
		this.getResults()
	}

	viewUser(id: number) {
		this.router.navigate(['users/', id])
	}

	createUser() {
		this.router.navigate(['users/', '0'])
	}
}
