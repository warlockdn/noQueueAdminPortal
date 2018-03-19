import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable()
export class AuthService {

  public isLoggedIn: boolean;
  public userType: string;

  constructor(private router: Router) {
    this.isLoggedIn = this.getLoginStatus();
    this.userType = this.getUserType();
    if (this.isLoggedIn !== true) {
      this.router.navigate(['/login']);
    }
  }

  login() {
    return new Promise((resolve, reject) => {
      this.isLoggedIn = true;
      this.setLoginStatus();
      this.setUserType('boss');
      resolve()
    }).catch((err) => {
      return new Error(err);
    })    
  }

  logout() {
    return new Promise((reject, resolve) => {
      localStorage.removeItem('isLoggedIn')
      this.isLoggedIn = false;
      resolve()
    }).catch((err) => {
      return new Error(err);
    })
  }

  getLoginStatus() {
    const status = localStorage.getItem('isLoggedIn');
    if (status) {
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
