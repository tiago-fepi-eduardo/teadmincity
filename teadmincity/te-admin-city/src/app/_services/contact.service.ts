import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtService } from '../_services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient, private jwt: JwtService) { }

  GetAll()
  {
    let header = new HttpHeaders()
      .set('Authorization', `Bearer ` + this.jwt.jwtToken)

    return this.http.get(environment.endpoints.contact, 
    {
      headers : header
    })
  }

  /*
  Post(user: String, pass:String)
  {
    return this.http.post(environment.endpoints.contact,
    {
      userName: user,
      password: pass
    }).toPromise().then((data:any) =>
      console.log('My return:', data.id)
    );
  }
  */
}
