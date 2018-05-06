import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { resolve } from 'url';
import { reject } from 'q';

import { ConstantsService } from './../constants/constants.service';

@Injectable()
export class AuthService {

  public isLoggedIn: boolean;
  public userType: string;

  constructor(private router: Router, private http: HttpClient) {
    this.isLoggedIn = this.getLoginStatus();
    this.userType = this.getUserType();
    if (this.isLoggedIn !== true) {
      this.router.navigate(['/login']);
    }
  }

  login(params) {
    return new Promise((resolve: (success) => void, reject: (reason: Error) => void) => {
      this.http.post(ConstantsService.auth + '/login', params).subscribe(
        response => {
          this.isLoggedIn = true;
          this.setLoginStatus();
          this.setUserType('boss');
          resolve(response)
        }, error => {          
          reject(error)
        }
      )
    })

    // return this.http.post(ConstantsService.auth, params)

    // return new Promise((resolve, reject) => {
    //   this.http.post(ConstantsService.auth, params).

    //   this.isLoggedIn = true;
    //   this.setLoginStatus();
    //   this.setUserType('boss');
    //   resolve()
    // }).catch((err) => {
    //   return new Error(err);
    // })    
  }

  logout() {
    return new Promise((reject, resolve) => {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('authToken');
      this.isLoggedIn = false;
      resolve()
    }).catch((err) => {
      return new Error(err);
    })
  }

  getLoginStatus() {
    const status = localStorage.getItem('isLoggedIn');
    const token = localStorage.getItem('authToken');
    if (status && token) {
      return true
    } else {
      return false
    }
  }

  setLoginStatus() {
    localStorage.setItem('isLoggedIn', 'true');
  }

  setUserType(user) {
    localStorage.setItem('user', user);
  }

  getUserType() {
    const usertype = localStorage.getItem('user');
    return usertype;
  }

}
