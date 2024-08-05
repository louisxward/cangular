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

	//'user = {:user} && follows_user = {:follows_user}',
	formatQueryNew(params: { [key: string]: string }): string {
		let filterPre = ''
		for (const [key, value] of Object.entries(params)) {
			if (filterPre) {
				filterPre = key + '= {:' + key + '}'
			} else {
				filterPre = filterPre + ' &&' + key + '= {:' + key + '}'
			}
		}
		return this.pb.filter(filterPre, params)
	}
}
