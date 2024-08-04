import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { LoadingBarService } from '@ngx-loading-bar/core'
import { LoadingBarState } from '@ngx-loading-bar/core/loading-bar.state'
import PocketBase from 'pocketbase'
import { Record } from 'pocketbase'
import { ApiService } from 'src/app/Core/services/api/api.service'
import { ErrorContainer } from './error'
import { Router } from '@angular/router'

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
	pb: PocketBase
	loader: LoadingBarState
	form: FormGroup
	responses: string[]

	@Input('userData') userDetails = {
		id: '0',
		username: '',
		email: '',
	}

	constructor(
		private apiService: ApiService,
		private loadingBarService: LoadingBarService,
		private fb: FormBuilder,
		private router: Router
	) {
		this.pb = this.apiService.pb
		this.loader = this.loadingBarService.useRef()
		this.form = this.fb.group({})
		this.responses = []
	}
	ngOnInit(): void {
		this.setupForm()
	}

	setupForm() {
		// Username
		this.form.addControl(
			'username',
			new FormControl(
				this.userDetails.username,
				Validators.compose([
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(64),
				])
			)
		)
		// Email
		this.form.addControl(
			'email',
			new FormControl(this.userDetails.email, [
				Validators.required,
				Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
			])
		)
		// If new user
		if (this.userDetails.id == '0') {
			this.form.addControl(// Makes record email field public
				'emailVisibility',
				new FormControl(true, Validators.required)
			)
			this.form.addControl(
				'password',
				new FormControl(
					'',
					Validators.compose([
						Validators.required,
						Validators.minLength(5),
						Validators.maxLength(64),
					])
				)
			)
			this.form.addControl(
				'passwordConfirm',
				new FormControl(
					'',
					Validators.compose([
						Validators.required,
						Validators.minLength(5),
						Validators.maxLength(64),
					])
				)
			)
		}
		// If not new user
		else{
			this.form.controls['email'].disable()
		}
	}

	async submit(){
		this.loader.start()
		if (this.userDetails.id == '0') {
			await this.createUser()
		} else {
			await this.saveUser()
		}
		this.loader.complete()
	}


	async saveUser() {
		const myPromise = this.pb
			.collection('users')
			.update(this.userDetails.id, this.form.value)
		await this.handlePromise(myPromise, false)
	}

	async createUser() {
		const myPromise = this.pb.collection('users').create(this.form.value)
		await this.handlePromise(myPromise, true)
	}

	async handlePromise(myPromise: Promise<Record>, create: boolean) {
		await myPromise
			.then((value) => {
				create ? console.info('user created') : console.info('user saved')
				this.router.navigate(['users'])
			})
			.catch((e) => {
				this.handleError(e)
			})
	}

	handleError(e: any){// ToDo - sort type out
		let errorContainer: ErrorContainer = e.data
		let error = errorContainer.data
		let errorMessages: string[] = []
		if (error.passwordConfirm) {
			errorMessages.push(
				error.passwordConfirm.message.replace('Values', 'Passwords')
			)
			this.form.controls['password'].setValue('')
			this.form.controls['passwordConfirm'].setValue('')
		}
		if (error.username) {
			errorMessages.push(error.username.message)
			this.form.controls['username'].setValue(this.userDetails.username)
		}
		if (error.email) {
			errorMessages.push(error.email.message)
			this.form.controls['email'].setValue(this.userDetails.email)
		}
		this.responses = errorMessages
	}

}
