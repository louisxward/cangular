import { Injectable } from '@angular/core'
import { LoginService } from '../login/login.service'

@Injectable({
	providedIn: 'root',
})
export class AuthInactivityService {
	constructor(private loginService: LoginService) {
		this.startTimer()
		this.setupActivityListeners()
	}
	private timeoutDuration = 1 * 60 * 1000 // 5 minutes in milliseconds
	private timeout: any

	private startTimer() {
		this.timeout = setTimeout(() => {
			this.logout()
		}, this.timeoutDuration)
	}

	private resetTimer() {
		clearTimeout(this.timeout)
		this.startTimer()
	}

	private logout() {
		this.loginService.logout(true)
	}

	private setupActivityListeners() {
		window.addEventListener('mousemove', () => this.resetTimer())
		window.addEventListener('keydown', () => this.resetTimer())
		window.addEventListener('click', () => this.resetTimer())
		window.addEventListener('scroll', () => this.resetTimer())
		window.addEventListener('touchstart', () => this.resetTimer())
	}
}
