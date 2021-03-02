import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userName!: String;
  password!: String;
  
  constructor(private api:LoginService) { }
 
  postData()
  {
    this.api.Post(this.userName, this.password);
  }
}