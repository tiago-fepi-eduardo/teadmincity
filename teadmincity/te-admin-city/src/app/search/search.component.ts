import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { ExportService } from '../_services/export.service';
import { OrderService } from '../_services/order.service';
import { OrderStatusService } from '../_services/order-status.service';
import { OcorrencyService } from '../_services/ocorrency.service';
import { OcorrencyDetailService } from '../_services/ocorrency-detail.service';
import { OrderModel } from '../_models/order-model';
import { OcorrencyModel } from '../_models/ocorrency-model';
import { OcorrencyDetailModel } from '../_models/ocorrency-detail-model';
import { OrderStatusModel } from '../_models/order-status-model';
import { SearchModel } from '../_models/search-model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

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

  @ViewChild('searchTable') searchTable: ElementRef;

  constructor(private apiOrder:OrderService, 
      private apiOcorrency:OcorrencyService,
      private apiDetail:OcorrencyDetailService,
      private apiStatus:OrderStatusService,
      private exportService: ExportService) { 
    this.order = new OrderModel();
    this.order.ocorrency = new OcorrencyModel();
    this.order.ocorrencyDetail = new OcorrencyDetailModel();
    this.order.orderStatus = new OrderStatusModel();
    this.searchModel = new SearchModel();
    this.modal = false;
    this.readonly = true;
    this.alert = false;
  }

  ngOnInit(): void {
    this.getAllOrder();
    this.getAllOcorrency();
    this.getAllStatus();
  }

  paginationData(page: number)
  {
    if(page >= 0 && page <= this.order.totalPage)
    {
      this.searchModel.skip = environment.pagination * page;
      this.searchModel.page = environment.pagination;

      this.apiOrder.Patch(this.searchModel)
      .subscribe({
        next: (data:any) => {
          if(data.total > 0)
            this.orders = data.orders;
          else
            this.orders = [];
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

  filterData()
  {
    this.apiOrder.Patch(this.searchModel)
      .subscribe({
        next: (data:any) => {
          if(data.total > 0)
            this.orders = data.orders;
          else
            this.orders = [];
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

      this.ddlOcorrencyIndex = (this.ocorrencies.findIndex(c => c.id == this.order.ocorrency.id)) + 1;
      this.ddlStatusIndex = (this.statuses.findIndex(c => c.id == this.order.orderStatus.id)) + 1;
      this.getAllOcorrencyDetail(this.order.ocorrency.id);
      this.ddlDetailIndex = this.order.ocorrencyDetail.id;//(this.details.findIndex(c => c.id == this.order.ocorrencyDetail.id)) + 1;
    }
  }

  closeData()
  {
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
        if(data.total > 0)
            this.orders = data.orders;
          else
            this.orders = [];
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

  getAllOcorrencyDetail(ocorrencyId: number)
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

  exportTable(){
    if(confirm("Are you sure want to print?"))
      this.exportService.exportTableElmToExcel(this.searchTable, 'Report-' + Date.now.toString());
  }
}
