import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtService } from '../_services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient, private jwt: JwtService) { }

  GetAll(skip: number, limit: number)
  {
    let header = new HttpHeaders()
      .set('Authorization', `bearer ` + this.jwt.jwtToken);

    console.log(this.jwt.jwtToken);

    return this.http.patch(environment.endpoints.order,      
      {
        'skip':skip,
        'limit':limit,
      },
      { 
        headers: header
      }
    );
  }
}
