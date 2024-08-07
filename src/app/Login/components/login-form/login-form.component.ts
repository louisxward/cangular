import { Component, OnInit } from '@angular/core'
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { LoginService } from 'src/app/Core/services/login/login.service'

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
	form: FormGroup
	response = ''

	constructor(
		private loginService: LoginService,
		private formBuilder: FormBuilder
	) {
		this.form = this.formBuilder.group({
			username: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(64),
				]),
			],
			password: [
				'12345',
				Validators.compose([
					Validators.required,
					Validators.minLength(5),
					Validators.maxLength(64),
				]),
			],
		})
	}

	ngOnInit(): void {}

	async submit() {
		await this.loginService
			.login(this.form.get('username')?.value, this.form.get('password')?.value)
			.then((value: string) => (this.response = value))
		if (this.response != 'user found') {
			this.form.reset()
		}
	}
}
