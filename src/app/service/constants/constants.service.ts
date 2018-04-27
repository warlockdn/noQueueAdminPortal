import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {

  // public static api = 'http://localhost:3000/';
  // public static auth = 'http://localhost:3000/auth/';
  // public static partner = 'http://localhost:3000/partner/'

  public static api = 'http://api.spazefood.xyz/';
  public static auth = 'http://api.spazefood.xyz/auth/';
  public static partner = 'http://api.spazefood.xyz/partner/'

  constructor() { }

  getToken() {
    return localStorage.getItem('authToken');
  }

  setToken(token) {
    localStorage.setItem('authToken', token);
  }

}
