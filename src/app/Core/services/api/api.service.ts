import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase'
import { environment } from 'src/environment/environment';


@Injectable()
export class ApiService {

    pb: PocketBase

    constructor() {
        console.log("ApiService - Constuctor - Start")
        console.log("ApiService - Url: " + environment.apiUrl)
        this.pb = new PocketBase(environment.apiUrl)
        console.log("ApiService - Constuctor - End")
    }

}