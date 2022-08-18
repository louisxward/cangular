import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user'
import { Observable } from 'rxjs';


const USER_API_BASE_URL = 'http://localhost:8081/api/'



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { 
  }
  
  getUsers(): Observable<User[]>{
      return this.http.get<User[]>(USER_API_BASE_URL+"users");
  }

  deleteUser(id: number){
      return this.http.delete(USER_API_BASE_URL+"/"+id);
  }

  addUser(user: User){
      return this.http.post(USER_API_BASE_URL, user);
  }

  
}
