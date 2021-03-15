import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';
import { LoginModel } from '../_models/login-model';
import { Router } from '@angular/router';
import { JwtService } from '../_services/jwt.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login: LoginModel;
  
  constructor(private api:LoginService, private router: Router, private jwt: JwtService, private cookieService: CookieService ) { 
    this.login = new LoginModel();
  }
 
  ngOnInit(): void {
      console.log('Cookie cleaned.');
      this.cookieService.deleteAll('token');
  }

  postData()
  {
    this.api.Post(this.login)
    .subscribe({
      next: (data:any) => {
        if(data.error == null)
        {
          this.cookieService.set( 'token', data.token );
          this.router.navigate(["home"]);
        }
        else
          this.login.callbackMessage = data.error.message;
      },
      error: error => {
        this.login.callbackMessage = error;
      },
    });
  }  
}