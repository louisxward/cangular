import { Injectable } from '@angular/core'
import { LoginService } from '../login/login.service'

@Injectable({
	providedIn: 'root',
})
export class AuthCheckService {
	constructor(private loginService: LoginService) {
		this.loginService.onLoginChange().subscribe((e) => this.switchTimer(e))
	}
	private timeoutDuration = 1 * 60 * 1000
	private timeout: any

	private enableTimer() {
		if (!this.timeout) {
			this.startTimer()
		}
	}

	private switchTimer(enable: boolean) {
		enable ? this.enableTimer() : this.disableTimer()
	}

	private disableTimer() {
		if (this.timeout) {
			clearTimeout(this.timeout)
			this.timeout = null
		}
	}

	private startTimer() {
		this.timeout = setTimeout(async () => {
			await this.loginService.checkAuth().then((e) => {
				if (!e) {
					this.loginService.logout(true)
				} else {
					this.resetTimer()
				}
			})
		}, this.timeoutDuration)
	}

	private resetTimer() {
		clearTimeout(this.timeout)
		this.startTimer()
	}
}
