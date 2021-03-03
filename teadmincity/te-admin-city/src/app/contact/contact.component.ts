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

  constructor(private api:ContactService) { 
    this.contacts = [];
  }

  ngOnInit(): void {
    this.api.GetAll()
    .subscribe({
      next: (data:any) => {
        this.contacts = data;
      },
      error: error => {
          console.error('There was an error: ', error);
      },
    });
  }
  
  /*
  userName! :String;
  password! :String;

  postData()
  {
    this.api.Post(this.userName, this.password);
  }
  */
}