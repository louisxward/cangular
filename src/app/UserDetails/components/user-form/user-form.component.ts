import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { LoadingBarService } from '@ngx-loading-bar/core'
import { LoadingBarState } from '@ngx-loading-bar/core/loading-bar.state'
import PocketBase from 'pocketbase'
import { ApiService } from 'src/app/Core/services/api/api.service'

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
	pb: PocketBase
	loader: LoadingBarState
	form: FormGroup

	@Input('userData') userDetails = {
		id: '',
		username: '',
		email: '',
	}

	constructor(
		private apiService: ApiService,
		private loadingBarService: LoadingBarService,
		private fb: FormBuilder,
	) {
		this.pb = this.apiService.pb
		this.loader = this.loadingBarService.useRef()
		this.form = this.fb.group({})
	}
	ngOnInit(): void {
		console.log("ngOnInit")
		console.log(this.userDetails.id)
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
			// hmm
		}
	}

	submit(){
		
	}
}
