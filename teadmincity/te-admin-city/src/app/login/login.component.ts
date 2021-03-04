import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';
import { LoginModel } from '../_models/login-model';
import { Router } from '@angular/router';
import { JwtService } from '../_services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login: LoginModel;
  
  constructor(private api:LoginService, private router: Router, private jwt: JwtService) { 
    this.login = new LoginModel();
  }
 
  postData()
  {
    this.api.Post(this.login)
    .subscribe({
      next: (data:any) => {
        if(data.error == null)
        {
          this.jwt.setToken(data.token);
          this.router.navigate(["home"]);
        }
        else
          console.error(data);
      },
      error: error => {
          console.error(error);
      },
    });
  }  
}