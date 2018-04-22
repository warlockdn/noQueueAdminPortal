import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {

  public static api = 'http://localhost:3000/';
  public static auth = 'http://localhost:3000/auth/';
  public static partner = 'http://localhost:3000/partner/'

  constructor() { }

  getToken() {
    return localStorage.getItem('authToken');
  }

  setToken(token) {
    localStorage.setItem('authToken', token);
  }

}
