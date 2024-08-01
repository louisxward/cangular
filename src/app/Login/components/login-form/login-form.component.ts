import { Component, OnInit } from '@angular/core'
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
// import { LoginService } from 'src/app/Core/services/login/login.service'
import { Store } from '@ngxs/store';
import { Login } from 'src/app/Core/state/auth/auth.state';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
	form: FormGroup
	response = ''

	constructor(
		// private loginService: LoginService,
		private formBuilder: FormBuilder,
		private store: Store
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

	submit() {
		this.store.dispatch(new Login({ username: this.form.get('username')?.value, password: this.form.get('password')?.value }));
	}
}
