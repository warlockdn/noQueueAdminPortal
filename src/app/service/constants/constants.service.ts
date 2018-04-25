import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {

  public static api = 'http://localhost:3000/';
  public static auth = 'http://localhost:3000/auth/';
  public static partner = 'http://localhost:3000/partner/'

  // public static api = 'http://ec2-13-232-37-65.ap-south-1.compute.amazonaws.com/';
  // public static auth = 'http://ec2-13-232-37-65.ap-south-1.compute.amazonaws.com/auth/';
  // public static partner = 'http://ec2-13-232-37-65.ap-south-1.compute.amazonaws.com/partner/'

  constructor() { }

  getToken() {
    return localStorage.getItem('authToken');
  }

  setToken(token) {
    localStorage.setItem('authToken', token);
  }

}
