import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { 
  }

  Post(user: String, pass:String)
  {
    return this.http.post(environment.endpoints.login,
    {
      userName: user,
      password: pass
    }).toPromise().then((data:any) =>
      console.log('My return:', data.id)
    );
  }
}