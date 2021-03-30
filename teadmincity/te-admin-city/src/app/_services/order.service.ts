import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtService } from '../_services/jwt.service';
import { OrderModel } from '../_models/order-model';
import { SearchModel } from '../_models/search-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient, private jwt: JwtService) { }

  Patch(search: SearchModel)
  {
    let header = new HttpHeaders()
      .set('Authorization', `bearer ` + this.jwt.jwtToken);
    
    return this.http.patch(environment.endpoints.order,      
      {
        'id': (search.id != null && search.id != '') ? parseInt(search.id) : 0,
        'ocorrencyId': parseInt(search.ocorrencyId),
        'ocorrencyDetailId':parseInt(search.ocorrencyDetailId),
        'orderStatusId': parseInt(search.orderStatusId),
        'startDate': (search.startDate != null && search.startDate != '') ? new Date(search.startDate) : new Date(1900,1,1),
        'endDate': (search.endDate != null && search.endDate != '') ? new Date(search.endDate) : new Date(2100,1,1),
        'skip':search.skip,
        'limit':search.page,
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
