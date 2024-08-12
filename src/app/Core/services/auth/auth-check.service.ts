import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngxs/store'
import { ApiService } from '../api/api.service'
import { LoginService } from '../login/login.service'

@Injectable({
	providedIn: 'root',
})
export class AuthCheckService {
	constructor(
		private store: Store,
		private router: Router,
		private apiService: ApiService,
		private loginService: LoginService
	) {
		this.startTimer()
	}
	private timeoutDuration = 1 * 60 * 1000 // 5 minutes in milliseconds
	private timeout: any

	private startTimer() {
		this.timeout = setTimeout(async () => {
			await this.refreshAuth()
		}, this.timeoutDuration)
	}

	private resetTimer() {
		clearTimeout(this.timeout)
		this.startTimer()
	}

	private logout() {
		this.loginService.logout()
	}

	private async refreshAuth() {
		await this.loginService.checkAuth().then((e) => {
			if (e) {
				this.resetTimer
				return
			}
			this.logout()
		})
	}
}
