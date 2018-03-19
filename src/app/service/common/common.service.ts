import { Injectable } from '@angular/core';
import { AuthService } from './../auth/auth.service';

@Injectable()
export class CommonService {
  readonly appName: string = 'adminWeb';
  public title: string = 'Dashboard';
  public isOpen: boolean = false;
  
  constructor(private auth: AuthService) { 
    this.isOpen = false;
  }

}
