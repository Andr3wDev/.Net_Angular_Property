import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForLogin, UserForRegister } from '../Models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authUser(user: UserForLogin){
    return this.http.post(environment.baseUrl + environment.api_login, user);
  }

  registerUser(user: UserForRegister) {
    return this.http.post(environment.baseUrl + environment.api_register, user);
  }
}

