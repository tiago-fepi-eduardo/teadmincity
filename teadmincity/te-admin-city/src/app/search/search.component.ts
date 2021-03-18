import { Component, OnInit } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { OrderStatusService } from '../_services/order-status.service';
import { OcorrencyService } from '../_services/ocorrency.service';
import { OcorrencyDetailService } from '../_services/ocorrency-detail.service';
import { OrderModel } from '../_models/order-model';
import { OcorrencyModel } from '../_models/ocorrency-model';
import { OcorrencyDetailModel } from '../_models/ocorrency-detail-model';
import { OrderStatusModel } from '../_models/order-status-model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  orders: OrderModel[] = [];
  order: OrderModel;
  //ocorrency = new Map();
  //ocorrencyDetail = new Map();
  //orderStatus = new Map();
  modal: boolean;
  readonly: boolean;
  alert: boolean;
  
  constructor(private api:OrderService) { 
    this.order = new OrderModel();
    this.order.ocorrency = new OcorrencyModel();
    this.order.ocorrencyDetail = new OcorrencyDetailModel();
    this.order.orderStatus = new OrderStatusModel();
    this.modal = false;
    this.readonly = true;
    this.alert = false;
  }

  ngOnInit(): void {
    this.api.GetAll(0, environment.pagination)
    .subscribe({
      next: (data:any) => {
        this.orders = data.orders;
        this.order.totalItems = data.total;
        this.order.totalPage = Math.floor(data.total / environment.pagination);
        this.order.page = data.page;
      },
      error: error => {
        this.order.callbackSuccess = false;
        this.order.callbackMessage = error;
        this.alert = true;
        console.error(error);
        setTimeout(() => {
          this.alert = false;
        }, 5000);
      },
    });
  }

  paginationData(page: number)
  {
    if(page >= 0 && page <= this.order.totalPage)
    {
      let skip = environment.pagination * page;

      this.api.GetAll(skip, environment.pagination)
      .subscribe({
        next: (data:any) => {
          this.orders = data.contacts;
          this.order.totalItems = data.total;
          this.order.totalPage = Math.floor(data.total / environment.pagination);
          this.order.page = data.page;
        },
        error: error => {
            this.order.callbackSuccess = false;
            this.order.callbackMessage = error;
            this.alert = true;
            setTimeout(() => {
              this.alert = false;
            }, 5000);
            console.error(error);
        },
      });
    }
  }

  putData()
  {
    /*
    this.api.Put(this.contact.id, this.contact.closed)
      .subscribe({
        next: (data:any) => {
          this.ngOnInit();
          this.contact.callbackSuccess = true;
          this.contact.callbackMessage = 'Success.';
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 5000);
        },
        error: error => {
          this.contact.callbackSuccess = false;
          this.contact.callbackMessage = error;
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 5000);
          console.error(error);
        },
      });
    */
    this.modal = false;
    this.readonly = true;
  }

  viewData(id: number)
  {
    var result = this.orders.find(x => x.id == id);
    if(result != null)
    {
      this.order.id = result['id'];
      this.order.latitude = result['latitude'];
      this.order.longitude = result['longitude'];
      this.order.ocorrency = result['ocorrency'];
      this.order.ocorrencyDetail = result['ocorrencyDetail'];
      this.order.orderStatus = result['orderStatus'];
      this.order.createdAt = result['createdAt'];
      this.modal = true;
      this.readonly = true;
    }
  }

  editData(id: number)
  {
    var result = this.orders.find(x => x.id == id);
    if(result != null)
    {
      this.order.id = result['id'];
      this.order.latitude = result['latitude'];
      this.order.longitude = result['longitude'];
      this.order.ocorrency = result['ocorrency'];
      this.order.ocorrencyDetail = result['ocorrencyDetail'];
      this.order.orderStatus = result['orderStatus'];
      this.order.createdAt = result['createdAt'];
      this.modal = true;
      this.readonly = false;
    }
  }

  closeData()
  {
    this.modal = false;
    this.readonly = true;
  }
}
