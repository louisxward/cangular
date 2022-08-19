import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user'
import { Observable } from 'rxjs';


const USER_API_BASE_URL = 'http://localhost:8081/api/users/'



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { 
  }

  getUser(id: number){
    console.log("getUser")
    console.log(USER_API_BASE_URL+id)
    return this.http.get<User>(USER_API_BASE_URL+id);
  }
  
  getUsers(): Observable<User[]>{
      return this.http.get<User[]>(USER_API_BASE_URL);
  }

  deleteUser(id: number){
      return this.http.delete<User>(USER_API_BASE_URL+id);
  }

  addUser(user: User){
      return this.http.post<User>(USER_API_BASE_URL, user);
  }

  saveUser(user: User){
    this.http.put(USER_API_BASE_URL+user.id, user)
    .subscribe();
}

}
