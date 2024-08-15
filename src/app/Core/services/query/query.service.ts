import { Injectable } from '@angular/core'
import PocketBase from 'pocketbase'
import { ApiService } from '../api/api.service'

@Injectable()
export class QueryService {
	pb: PocketBase
	constructor(private apiService: ApiService) {
		this.pb = apiService.pb
	}

	formatQuery(data: string): string {
		let query = ''
		const dataParsed = data.replace(/[!^"{}]+/g, '')
		const split = dataParsed.split(',')
		for (var x = 0; x < split.length; x++) {
			const string = split[x]
			if (string.length - 1 == string.indexOf(':')) {
				//nothing
			} else {
				if (query.length > 0 && x < split.length) {
					query = query.concat(' && ')
				}
				const split2 = string.split(':')
				query = query.concat(split2[0] + '~"' + split2[1] + '"')
			}
		}
		return query
	}

	formatQueryAnd(params: { [key: string]: string | null }): string {
		let filter = ''
		for (const [key, value] of Object.entries(params)) {
			if (value) {
				if ('' == filter) {
					filter = key + '~ {:' + key + '}'
				} else {
					filter = filter + ' &&' + key + '~ {:' + key + '}'
				}
			}
		}
		return this.pb.filter(filter, params) // Seems backwords since we can add the values in the above?
	}
}
