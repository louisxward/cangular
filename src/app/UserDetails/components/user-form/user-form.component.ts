import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ErrorRespose } from 'src/app/Core/services/error/error.service'
import { RoleService } from 'src/app/Core/services/role/role.service'
import { UserService } from 'src/app/Core/services/user/user.service'
import { RoleGroup } from 'src/app/Core/state/role/role'
import { User } from 'src/app/Core/state/user/user'

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
	form: FormGroup
	responses: ErrorRespose[] = []
	usernameRegex: RegExp = /^[a-zA-Z0-9]+$/

	@Input('userDetails') userDetails: User
	@Input('currentUser') currentUser: boolean = false

	overrideSaveRoleGroup: RoleGroup = RoleGroup.Admin
	hasOverrideSaveRoleGroup: boolean = false

	loaded: boolean = false

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private userService: UserService,
		private roleService: RoleService
	) {}

	async ngOnInit(): Promise<void> {
		this.hasOverrideSaveRoleGroup = await this.roleService.hasRoleGroup(
			this.overrideSaveRoleGroup
		)
		this.setupForm()
		this.loaded = true
	}

	// Form
	setupForm() {
		this.form = new FormGroup({})
		// Username
		this.form.addControl(
			'username',
			new FormControl(
				this.userDetails.username,
				Validators.compose([
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(33),
					Validators.pattern(this.usernameRegex),
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
					null,
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
					null,
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
		if (!this.currentUser && !this.hasOverrideSaveRoleGroup) {
			this.form.disable()
		}
	}

	// Form Value Handlers
	//Errors
	updateFormErrors() {
		for (let repsonse of this.responses) {
			for (let formKey of repsonse.formKeys) {
				const control = this.form.controls[formKey]
				control.setErrors({ incorrect: true })
				if (repsonse.clearForm) {
					control.setValue(null)
				}
			}
		}
	}

	// Username
	validateKeyPress(event: KeyboardEvent) {
		const inputChar = String.fromCharCode(event.keyCode)
		if (!this.usernameRegex.test(inputChar)) {
			event.preventDefault()
		}
	}

	validatePaste(event: ClipboardEvent) {
		const clipboardData = event.clipboardData
		if (!clipboardData) {
			return
		}
		const pastedText = clipboardData.getData('text')
		if (!this.usernameRegex.test(pastedText)) {
			event.preventDefault()
		}
	}

	// Form Actions
	submit() {
		this.responses = []
		if (this.userDetails.id == '0') {
			this.createUser()
		} else {
			this.saveUser()
		}
	}

	saveUser() {
		this.userService
			.updateUser(this.form.value, this.userDetails.id)
			.then((e) => {
				if (e instanceof Boolean) {
					this.router.navigate(['users'])
				} else {
					this.responses = e
					this.updateFormErrors()
				}
			})
	}

	createUser() {
		this.userService.createUserPassword(this.form.value).then((e) => {
			if (e instanceof Boolean) {
				this.router.navigate(['users'])
			} else {
				this.responses = e
				this.updateFormErrors()
			}
		})
	}
}
