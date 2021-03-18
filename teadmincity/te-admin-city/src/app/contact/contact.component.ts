import { Component, OnInit } from '@angular/core';
import { ContactService } from '../_services/contact.service';
import { ContactModel } from '../_models/contact-model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: ContactModel[] = [];
  contact: ContactModel;
  modal: boolean;
  readonly: boolean;
  alert: boolean;
  
  constructor(private api:ContactService) { 
    this.contact = new ContactModel();
    this.modal = false;
    this.readonly = true;
    this.alert = false;
  }

  ngOnInit(): void {
    this.api.GetAll(0, environment.pagination)
    .subscribe({
      next: (data:any) => {
        this.contacts = data.contacts;
        this.contact.totalItems = data.total;
        this.contact.totalPage = Math.floor(data.total / environment.pagination);
        this.contact.page = data.page;
      },
      error: error => {
          this.contact.callbackSuccess = false;
          this.contact.callbackMessage = error;
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
    if(page >= 0 && page <= this.contact.totalPage)
    {
      let skip = environment.pagination * page;

      this.api.GetAll(skip, environment.pagination)
      .subscribe({
        next: (data:any) => {
          this.contacts = data.contacts;
          this.contact.totalItems = data.total;
          this.contact.totalPage = Math.floor(data.total / environment.pagination);
          this.contact.page = data.page;
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
    }
  }

  putData()
  {
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

    this.modal = false;
    this.readonly = true;
  }

  viewData(id: number)
  {
    var result = this.contacts.find(x => x.id == id);
    if(result != null)
    {
      this.contact.id = result['id'];
      this.contact.subject = result['subject'];
      this.contact.email = result['email'];
      this.contact.message = result['message'];
      this.contact.createdAt = result['createdAt'];
      this.contact.closed = result['closed'];
      this.modal = true;
      this.readonly = true;
    }
  }

  editData(id: number)
  {
    var result = this.contacts.find(x => x.id == id);
    if(result != null)
    {
      this.contact.id = result['id'];
      this.contact.subject = result['subject'];
      this.contact.email = result['email'];
      this.contact.message = result['message'];
      this.contact.createdAt = result['createdAt'];
      this.contact.closed = result['closed'];
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