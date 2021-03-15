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
      headers : header,
      params:{
        //'id':'2',
        //'closed':'',
      }
    });
  }
  
  Put(id: number, closed:boolean)
  {
    let header = new HttpHeaders()
      .set('Authorization', `Bearer ` + this.jwt.jwtToken)

     
    return this.http.put(environment.endpoints.contact,
      {
        'id':id,
        'closed':closed,
      },
      { 
        headers: header
      }
    );
  }
}
