import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonService } from './../../service/common/common.service';
import { PartnerService } from '../../service/partner/partner.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  constructor(private router: Router, private common: CommonService, private partner: PartnerService) { 
    this.common.title = 'Partners';
    this.common.opened = false;
  }

  ngOnInit() {
  }

  addPartner() {
    this.router.navigate(['partner/add'])
  }



}
