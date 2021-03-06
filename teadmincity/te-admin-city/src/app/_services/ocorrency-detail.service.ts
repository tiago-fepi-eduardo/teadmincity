import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtService } from '../_services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class OcorrencyDetailService {

  constructor(private http:HttpClient, private jwt: JwtService) { }

  GetAll(ocorrencyId: number)
  {
    let header = new HttpHeaders()
      .set('Authorization', `bearer ` + this.jwt.jwtToken);

    return this.http.get(environment.endpoints.ocorrencyDetail, 
    {
      headers : header,
      params:{
        'ocorrencyId': ocorrencyId.toString()
      }
    })
  }
}
