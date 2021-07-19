import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }


  register(user){
    return this.http.post<any>(environment.BASE_URL+'/register',{user : user})
  }


  login(email,password){
    return this.http.post<any>(environment.BASE_URL+'/login',{email : email , password : password})
  }
}
