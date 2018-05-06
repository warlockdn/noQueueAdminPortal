import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {

  public static api = 'http://localhost:3000';
  public static auth = 'http://localhost:3000/auth';
  public static partner = 'http://localhost:3000/partner'

  public static imagecdn = 'https://res.cloudinary.com/ddiiq3bzl/image/upload/logo/'
  public static imageserve = `https://res.cloudinary.com/ddiiq3bzl/image/upload/fl_lossy,f_auto,w_400,h_400,f_auto,c_fill/`

  public supportemail = 'info@spazefood.xyz';
  public supportphone = '+91 999 9999 999';

  // public static api = 'http://api.spazefood.xyz';
  // public static auth = 'http://api.spazefood.xyz/auth';
  // public static partner = 'http://api.spazefood.xyz/partner'

  constructor() { }

  getToken() {
    return localStorage.getItem('authToken');
  }

  setToken(token) {
    localStorage.setItem('authToken', token);
  }

}
