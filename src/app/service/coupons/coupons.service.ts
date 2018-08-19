import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../constants/constants.service';

export interface Coupon {
  id?: Number,
  discountCode: String,
  description: String,
  comments?: String,
  discountOptions: {
    type: String,
    value: Number,
    validFor: any,
  },
  minRequirement: {
    minimum: Boolean,
    minvalue?: Number,
  },
  limits: {
    isTotalLimit?: String,
    totalLimit?: String,
    limitOne?: String,
  },
  duration: {
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String,
  }
}

@Injectable()
export class CouponsService {

  public couponDetail: Coupon;
  public isLoaded: Boolean = false;
  public couponList: Array<Coupon>

  constructor(private http: HttpClient) {

    this.getAllCoupons().subscribe(
      response => {
        this.couponList = response["coupons"];
      }, err => {
        console.log("No coupons found");
      }
    )

  }

  getAllCoupons() {
    return this.http.get(ConstantsService.coupon)
  }

  saveCoupon(coupon) {
    return this.http.post(ConstantsService.coupon, {
      coupon: coupon
    });
  }

  updateCoupon(coupon, id) {
    return this.http.put(ConstantsService.coupon, {
      id: id,
      coupon: coupon
    })
  }

  setCouponStatus(id, status) {
    return this.http.patch(ConstantsService.coupon, {
      couponID: id,
      status: status
    })
  }

  deleteCoupon(id) {
    return this.http.delete(ConstantsService.coupon + '/' + id);
  }

}
