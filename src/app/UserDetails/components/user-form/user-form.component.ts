import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { LoadingBarService } from '@ngx-loading-bar/core'
import { LoadingBarState } from '@ngx-loading-bar/core/loading-bar.state'
import { ErrorRespose } from 'src/app/Core/services/error/error.service'
import { User, UserService } from 'src/app/Core/services/user/user.service'

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {
	loader: LoadingBarState
	form: FormGroup
	responses: ErrorRespose[]

	@Input('userDetails') userDetails: User

	constructor(
		private loadingBarService: LoadingBarService,
		private fb: FormBuilder,
		private router: Router,
		private userService: UserService
	) {
		this.loader = this.loadingBarService.useRef()
		this.form = this.fb.group({})
		this.responses = []
	}
	ngOnDestroy(): void {
		this.loader.stop
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
			this.form.addControl(
				// Makes record email field public
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
		else {
			this.form.controls['email'].disable()
		}
	}

	submit() {
		if (this.userDetails.id == '0') {
			this.createUser()
		} else {
			this.saveUser()
		}
	}

	saveUser() {
		this.loader.start()
		this.userService
			.updateUser(this.form.value, this.userDetails.id)
			.then((e) => {
				if (e instanceof Boolean) {
					this.router.navigate(['users'])
				} else {
					this.responses = e
				}
				this.loader.complete()
			})
	}

	createUser() {
		this.loader.start()
		this.userService.createUserPassword(this.form.value).then((e) => {
			if (e instanceof Boolean) {
				this.router.navigate(['users'])
			} else {
				this.responses = e
			}
			this.loader.complete()
		})
	}
}
