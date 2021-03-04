import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../_models/login-model';
import { ActivatedRoute } from '@angular/router';
import { JwtService } from '../_services/jwt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  login: LoginModel;

  constructor(private jwt: JwtService) { 
    this.login = new LoginModel();
  }

  ngOnInit(): void {
    console.log('token=', this.jwt.jwtToken);
    console.log('Username=', this.jwt.getUserName());
    console.log('email=', this.jwt.getEmail());
    console.log('role=', this.jwt.getRole());
    console.log('expire=', this.jwt.getExpiryTime());
    console.log('decode=', this.jwt.getDecodeToken());
  }
}
