import { Component, OnInit } from '@angular/core';

import { CommonService } from '../../service/common/common.service';
import { CouponsService } from '../../service/coupons/coupons.service';

@Component({
  selector: 'app-coupon-manger',
  templateUrl: './coupon-manger.component.html',
  styleUrls: ['./coupon-manger.component.scss']
})
export class CouponMangerComponent implements OnInit {

  constructor(private common: CommonService, public couponProvider: CouponsService) { 
    this.common.title = 'Coupon Manager';
    this.common.opened = false;
  }

  ngOnInit() {
  }

}
