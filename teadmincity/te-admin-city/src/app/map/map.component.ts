import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { OrderService } from '../_services/order.service';
import { OrderStatusService } from '../_services/order-status.service';
import { OcorrencyService } from '../_services/ocorrency.service';
import { OcorrencyDetailService } from '../_services/ocorrency-detail.service';
import { OrderModel } from '../_models/order-model';
import { OcorrencyModel } from '../_models/ocorrency-model';
import { OcorrencyDetailModel } from '../_models/ocorrency-detail-model';
import { OrderStatusModel } from '../_models/order-status-model';
import { SearchModel } from '../_models/search-model';
import { MapModel } from '../_models/map-model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
 
  maps: MapModel[] = [];
  map: MapModel;
  orders: OrderModel[] = [];
  order: OrderModel;
  ocorrencies: OcorrencyModel[] = [];
  details: OcorrencyDetailModel[] = [];
  statuses: OrderStatusModel[] = [];
  searchModel: SearchModel;
  
  modal: boolean;
  readonly: boolean;
  alert: boolean;

  ddlOcorrencyIndex: number;
  ddlDetailIndex: number;
  ddlStatusIndex: number;

  constructor(private apiOrder:OrderService, 
    private apiOcorrency:OcorrencyService,
    private apiDetail:OcorrencyDetailService,
    private apiStatus:OrderStatusService) { 

      this.order = new OrderModel();
      this.order.ocorrency = new OcorrencyModel();
      this.order.ocorrencyDetail = new OcorrencyDetailModel();
      this.order.orderStatus = new OrderStatusModel();
      this.searchModel = new SearchModel();
      this.modal = false;
      this.readonly = true;
      this.alert = false;

      this.map = new MapModel();
      this.map.zoom = environment.defaultLocation.zoom;
      this.map.latitude = environment.defaultLocation.latitude;
      this.map.longitude = environment.defaultLocation.longitude;
    }

  ngOnInit(): void {
      this.getAllOrder();
      this.getAllOcorrency();
      this.getAllStatus();
  }

  filterData()
  {
    this.apiOrder.Patch(this.searchModel)
      .subscribe({
        next: (data:any) => {
          if(data.total > 0){
            this.orders = data.orders;
            this.convertToMapsArray(data.orders);
          }
          else
          {
            this.orders = [];
            this.maps = [];
          }
          this.order.totalItems = data.total;
          this.order.totalPage = Math.floor(data.total / environment.pagination);
          this.order.page = data.page;          
          this.order.callbackSuccess = true;
          this.order.callbackMessage = 'Success.';
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 5000);
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

    this.modal = false;
    this.readonly = true;
  }

  getAllOrder()
  {
    this.searchModel.page = environment.pagination;
    this.searchModel.skip = 0;

    this.apiOrder.Patch(this.searchModel)
    .subscribe({
      next: (data:any) => {
        if(data.total > 0){
          this.orders = data.orders;
          this.convertToMapsArray(data.orders);
        }
        else
        {
          this.orders = [];
          this.maps = [];
        }
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

  getAllOcorrency()
  {
    this.apiOcorrency.GetAll()
    .subscribe({
      next: (data:any) => {
        this.ocorrencies = data.ocorrencies;
      },
      error: error => {
        this.alert = true;
        console.error(error);
        setTimeout(() => {
          this.alert = false;
        }, 5000);
      },
    });
  }

  getAllOcorrencyDetail(ocorrencyId : number)
  {
    if(ocorrencyId > 0)
    {
      this.apiDetail.GetAll(ocorrencyId)
      .subscribe({
        next: (data:any) => {
          this.details = data.ocorrencyDetails;
        },
        error: error => {
          this.alert = true;
          console.error(error);
          setTimeout(() => {
            this.alert = false;
          }, 5000);
        },
      });
    }
    else
      this.details = [];
  }

  getAllStatus()
  {
    this.apiStatus.GetAll()
    .subscribe({
      next: (data:any) => {
        this.statuses = data.orderStatus;
      },
      error: error => {
        this.alert = true;
        console.error(error);
        setTimeout(() => {
          this.alert = false;
        }, 5000);
      },
    });
  }

  convertToMapsArray(orders: OrderModel[])
  {
    this.maps = [];
    for (let index = 0; index < orders.length; index++) {
      const element = orders[index];
      let mp = new MapModel();
      mp.id = element.id.toString();
      mp.latitude = parseFloat(element.latitude);
      mp.longitude = parseFloat(element.longitude);
      mp.ocorrency = element.ocorrency.name;
      mp.ocorrencyDetail = element.ocorrencyDetail.description;
      mp.orderStatus = element.orderStatus.name;
      mp.createdAt = element.createdAt;
      this.maps.push(mp);
    }
  }

  editData(id: string)
  {
    var result = this.orders.find(x => x.id == parseInt(id));
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

      this.ddlOcorrencyIndex = (this.ocorrencies.findIndex(c => c.id == this.order.ocorrency.id)) + 1;
      this.ddlStatusIndex = (this.statuses.findIndex(c => c.id == this.order.orderStatus.id)) + 1;
      this.getAllOcorrencyDetail(this.order.ocorrency.id);
      this.ddlDetailIndex = this.order.ocorrencyDetail.id;
    }
  }

  putData()
  {
    this.order.ocorrencyId = this.ocorrencies[this.ddlOcorrencyIndex -1].id;
    this.order.ocorrencyDetailId = this.ddlDetailIndex;
    this.order.orderStatusId = this.statuses[this.ddlStatusIndex -1].id;
        
    this.apiOrder.Put(this.order)
      .subscribe({
        next: (data:any) => {
          this.ngOnInit();
          this.order.callbackSuccess = true;
          this.order.callbackMessage = 'Success.';
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 5000);
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
    
    this.modal = false;
    this.readonly = true;
  }

  closeData()
  {
    this.modal = false;
    this.readonly = true;
  }
}