import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { MatIconRegistry } from '@angular/material';

import { AuthService } from './../../service/auth/auth.service';
import { CommonService } from './../../service/common/common.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  //encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  user: { username ? : string, password ? : string } = {};
  error = false;
  
  constructor(private auth: AuthService, private common: CommonService, private router: Router) {
    this.auth.logout();
    this.common.title = 'adminWeb';
  }

  ngOnInit() {
    this.auth.logout();
  }

  login(loginForm) {

    this.error = false;

    this.auth.login({ username: this.user.username, password: this.user.password, type: 'boss' }).then((success) => {
      this.router.navigate(['/partner'])
    }).catch((err) => {
      this.error = true;
    })
  }

}

    
// this.auth.login()
//   .then((success) => {
//     this.router.navigate(['/dashboard'])
//   })
//   .catch((err) => {
//     alert(err)
//   })
