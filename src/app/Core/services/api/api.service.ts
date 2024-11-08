import { Injectable } from '@angular/core'

@Injectable()
export class ApiService {
	private apiUrl = 'https://your-api-endpoint.com' // Replace with your API endpoint

	constructor(private http: HttpClient) {}

	getData(): Observable<MyData[]> {
		return this.http.get<MyData[]>(this.apiUrl)
	}

	postData(data: any): Observable<any> {
		return this.http.post(this.apiUrl, data)
	}
}
