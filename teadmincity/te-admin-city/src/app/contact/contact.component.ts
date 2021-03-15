import { Component, OnInit } from '@angular/core';
import { ContactService } from '../_services/contact.service';
import { ContactModel } from '../_models/contact-model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: ContactModel[];
  contact: ContactModel;
  modal: boolean;
  readonly: boolean;
  alert: boolean;
  
  constructor(private api:ContactService) { 
    this.contacts = [];
    this.contact = new ContactModel();
    this.modal = false;
    this.readonly = true;
    this.alert = false;
  }

  ngOnInit(): void {
    this.api.GetAll()
    .subscribe({
      next: (data:any) => {
        this.contacts = data;
      },
      error: error => {
          this.contact.callbackSuccess = false;
          this.contact.callbackMessage = error;
          this.alert = true;
          console.error(error);
      },
    });
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
        },
        error: error => {
          this.contact.callbackSuccess = false;
          this.contact.callbackMessage = error;
          this.alert = true;
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