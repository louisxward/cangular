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
		console.log('AuthCheckService()') // ToDo - Remove when confident
		this.loginService.onLoginChange().subscribe((e) => this.switchTimer(e)) //ToDo - What does this pass into switch timer?
	}
	private timeoutDuration = 0.1 * 60 * 1000 // ToDo - Not sure on this time at the moment
	private timeout: any

	private enableTimer() {
		console.log('AuthCheckService().enableTimer()') // ToDo - Remove when confident
		if (!this.timeout) {
			this.refreshAuth()
			this.startTimer()
		}
	}

	private switchTimer(enable: boolean) {
		console.log('AuthCheckService().switchTimer()') // ToDo - Remove when confident
		enable ? this.enableTimer() : this.disableTimer()
	}

	private disableTimer() {
		console.log('AuthCheckService().disableTimer()') // ToDo - Remove when confident
		if (this.timeout) {
			this.timeout = null
		}
	}

	private startTimer() {
		console.log('AuthCheckService().startTimer()') // ToDo - Remove when confident
		this.timeout = setTimeout(async () => {
			await this.loginService.checkAuth().then((e) => {
				if (!e) {
					this.logout()
				} else {
					this.resetTimer()
				}
			})
		}, this.timeoutDuration)
	}

	private resetTimer() {
		console.log('AuthCheckService().resetTimer()') // ToDo - Remove when confident
		clearTimeout(this.timeout)
		this.startTimer()
	}

	private logout() {
		console.log('AuthCheckService().logout()') // ToDo - Remove when confident
		this.loginService.logout(true)
	}

	private async refreshAuth() {
		console.log('AuthCheckService().refreshAuth()') // ToDo - Remove when confident
		await this.loginService.checkAuth().then((e) => {
			if (!e) {
				this.logout()
			}
		})
	}
}
