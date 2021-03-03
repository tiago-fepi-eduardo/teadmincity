import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginModel } from '../_models/login-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { 
  }

  Post(login: LoginModel)
  {
    return this.http.post(environment.endpoints.login,
    {
      'username': login.username,
      'password': login.password
    });
  }
}