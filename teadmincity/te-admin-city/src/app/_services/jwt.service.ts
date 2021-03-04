import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
    jwtToken!: string;
    decodedToken!: { [key: string]: string };
 
    constructor() {
    }
 
    setToken(token: string) {
      if (token) {
        this.jwtToken = token;
      }
    }
 
    decodeToken() {
      if (this.jwtToken) {
        this.decodedToken = jwt_decode(this.jwtToken);
      }
    }
 
    getDecodeToken() {
      return jwt_decode(this.jwtToken);
    }
 
    getEmail() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.email : null;
    }
    
    getUserName() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.fullName : null;
    }

    getRole() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.role : null;
    }
 
    getExpiryTime() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.exp : null;
    }
 
    isTokenExpired(): boolean {

      let number = this.getExpiryTime()

      if(number != null)
      {
        const expiryTime: number = parseFloat(number);
        if (expiryTime) {
          return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
        } else {
          return false;
        }
      }
      else
        return false;
    }
}
