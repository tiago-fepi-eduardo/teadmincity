import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JwtService } from '../_services/jwt.service';
import { Router } from '@angular/router';
import { LoginModel } from '../_models/login-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  login: LoginModel;

  constructor(private cookieService: CookieService,
               private jwt: JwtService,
               private router: Router) {
                this.login = new LoginModel();
                }

  ngOnInit(): void {
    if(this.cookieService.check('token'))
    { 
      this.jwt.setToken(this.cookieService.get('token'));

      if(! this.jwt.isTokenExpired())
      {
        this.login.fullname = this.jwt.getFullName();
        this.login.username = this.jwt.getEmail();
        this.login.role = this.jwt.getRole();
        
        console.log('token=', this.jwt.jwtToken);
        console.log('Username=', this.jwt.getFullName());
        console.log('email=', this.jwt.getEmail());
        console.log('role=', this.jwt.getRole());
        console.log('expire=', this.jwt.getExpiryTime());
        console.log('decode=', this.jwt.getDecodeToken());
      }
      else
      {
        console.error('Token expired.');
        this.router.navigate(["login"]);
      }
    }
    else
    {
      console.error('Token invalid.');
      this.router.navigate(["login"]);
    }
  }
}
