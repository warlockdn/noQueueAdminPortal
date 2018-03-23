import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonService } from './../../service/common/common.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  constructor(private router: Router, private common: CommonService) { 
    this.common.title = 'Partners';
  }

  ngOnInit() {
  }

  addPartner() {
    this.router.navigate(['partner/add'])
  }

}