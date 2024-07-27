import { Injectable } from '@angular/core'
import PocketBase from 'pocketbase'
import { environment } from 'src/environment/environment'

@Injectable()
export class ApiService {
	pb: PocketBase

	constructor() {
		this.pb = new PocketBase(environment.apiUrl)
	}
}
