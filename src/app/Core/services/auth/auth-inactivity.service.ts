import { Injectable } from '@angular/core'
import { LoginService } from '../login/login.service'

@Injectable({
	providedIn: 'root',
})
export class AuthInactivityService {
	constructor(private loginService: LoginService) {
		this.loginService.onLoginChange().subscribe((e) => this.switchTimer(e)) //ToDo - What does this pass into switch timer?
	}
	private timeoutDuration = 0.1 * 60 * 1000 // 5 minutes in milliseconds
	private timeout: any

	private enableTimer() {
		console.log('enableTimer')
		if (!this.timeout) {
			this.startTimer()
			this.enableActivityListeners()
		}
	}

	private switchTimer(enable: boolean) {
		console.log('switchTimer')
		enable ? this.enableTimer() : this.disableTimer()
	}

	private disableTimer() {
		console.log('disableTimer')
		if (this.timeout) {
			clearTimeout(this.timeout)
			this.timeout = null
			this.disableActivityListeners()
		}
	}

	private startTimer() {
		console.log('startTimer')
		this.timeout = setTimeout(() => {
			this.logout()
		}, this.timeoutDuration)
	}

	private resetTimer() {
		console.log('resetTimer')
		if (this.timeout) {
			clearTimeout(this.timeout)
			this.startTimer()
		}
	}

	private logout() {
		console.log('logout')
		this.loginService.logout(true)
	}

	private enableActivityListeners() {
		window.addEventListener('keydown', () => this.resetTimer())
		window.addEventListener('click', () => this.resetTimer())
		window.addEventListener('scroll', () => this.resetTimer())
		window.addEventListener('touchstart', () => this.resetTimer())
	}

	private disableActivityListeners() {
		window.removeEventListener('keydown', () => this.resetTimer())
		window.removeEventListener('click', () => this.resetTimer())
		window.removeEventListener('scroll', () => this.resetTimer())
		window.removeEventListener('touchstart', () => this.resetTimer())
	}
}
