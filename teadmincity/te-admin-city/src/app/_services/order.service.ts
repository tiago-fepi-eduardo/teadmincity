import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtService } from '../_services/jwt.service';
import { OrderModel } from '../_models/order-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient, private jwt: JwtService) { }

  GetAll(skip: number, limit: number)
  {
    let header = new HttpHeaders()
      .set('Authorization', `bearer ` + this.jwt.jwtToken);

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

  Put(order: OrderModel)
  {
    let header = new HttpHeaders()
      .set('Authorization', `Bearer ` + this.jwt.jwtToken)
     
    return this.http.put(environment.endpoints.order,
      {
        'id':order.id,
        'latitude':order.latitude,
        'longitude':order.longitude,
        'ocorrencyId':order.ocorrencyId,
        'ocorrencyDetailId':order.ocorrencyDetailId,
        'orderStatusId':order.orderStatusId
      },
      { 
        headers: header
      }
    );
  }
}
