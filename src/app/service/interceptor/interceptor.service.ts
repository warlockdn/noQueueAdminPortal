import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { ConstantsService } from '../constants/constants.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private constants: ConstantsService, private router: Router, private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = this.constants.getToken() || '';
    
    if (token) {
      request = request.clone({
        headers: request.headers.set('x-access-token', token)
      });
    }

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (event.body.token) {
          this.constants.setToken(event.body.token);
        }
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 || err.status === 403) {
          console.log('Authentication Error');
          // this.auth.logout().then((response) => {
          //   this.router.navigate(['/login']);
          // })
        }
      }
    });
  }

}

