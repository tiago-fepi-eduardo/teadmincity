import { Component, OnInit } from '@angular/core';
import { ContactService } from '../_services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private api:ContactService) { }

  // On load
  ngOnInit(): void {
    this.api.GetAll().subscribe((data)=>{
      console.warn('My contact info: ', data);
    });
  }

  // On post
  userName! :String;
  password! :String;

  postData()
  {
    this.api.Post(this.userName, this.password);
  }
}