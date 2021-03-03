import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';
import { LoginModel } from '../_models/login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login: LoginModel;
  
  constructor(private api:LoginService) { 
    this.login = new LoginModel();
  }
 
  postData()
  {
    this.api.Post(this.login)
    .subscribe({
      next: (data:any) => {
        //this.login = data;
        console.log(data);
      },
      error: error => {
          console.error('There was an error: ', error);
      },
    });
  }  
}