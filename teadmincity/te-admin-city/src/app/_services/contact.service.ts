import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }

  GetAll()
  {
    return this.http.get(environment.endpoints.contact);
  }

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
}
