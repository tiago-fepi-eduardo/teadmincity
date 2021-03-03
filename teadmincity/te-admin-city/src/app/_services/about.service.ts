import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http:HttpClient) { }

  GetAll()
  {
    let header = new HttpHeaders()
      .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ4MTAwNDksImlzcyI6IkNpdHkuY29tIiwiYXVkIjoiQ2l0eS5jb20ifQ.MAPuaMwLjhFcy3O_zv_JrlemtnUshMnQSy_mMMo3JcI`)

    return this.http.get(environment.endpoints.about, 
    {
      headers : header
    })
  }
}