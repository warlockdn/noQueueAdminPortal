import { Component, EventEmitter, ViewChild, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import { AuthService } from './service/auth/auth.service';
import { CommonService } from './service/common/common.service';
import { ConstantsService } from './service/constants/constants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @Output() toggleSidenav = new EventEmitter<void>();
  @ViewChild('sidenav') sidenav: MatSidenav;

  title = 'app';

  constructor(public auth: AuthService, public common: CommonService, private router: Router, public constant: ConstantsService) {
    this.router.events.subscribe(event => {
      this.sidenav.close();
    })
  }

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  logout() {
    this.auth.logout().then((success) => {
      this.router.navigate(['login']);
    })
  }

}
