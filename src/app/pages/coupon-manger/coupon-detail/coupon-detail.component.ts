import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { CouponsService } from '../../../service/coupons/coupons.service';
import { PartnerService } from '../../../service/partner/partner.service';

@Component({
  selector: 'app-coupon-detail',
  templateUrl: './coupon-detail.component.html',
  styleUrls: ['./coupon-detail.component.scss']
})
export class CouponDetailComponent implements OnInit {

  couponForm: FormGroup;
  minDate: Date = new Date();
  minEndDate: Date = new Date();

  partnerList: Array<{
    partnerID?: Number,
    name?: String
  }>;

  selectedPartner: any = "global";

  constructor(private fb: FormBuilder, public couponProvider: CouponsService, public partnerProvider: PartnerService, public snackBar: MatSnackBar) { 
    this.createCouponForm();
    this.partnerProvider.getAllPartners()
    .then(response => {
      let partnerList = [];
      
      response.data.forEach(partner => {
        partnerList.push({
          partnerID: partner.partnerID,
          name: partner.name
        })
      });
      
      this.partnerList = partnerList;
      this.fillCouponForm();

      })
      .catch(err => {
        console.log("Error fetching Partnerlist ", err);
      })

      // this.couponForm.patchValue({"discountCode":"10OFF","description":"Test","comments":null,"discountOptions":{"type":"percentage","value":20,"validFor":"all"},"minRequirement":{"minimum":"none","minvalue":null},"limits":{"isTotalLimit":null,"totalLimit":null,"limitOne":true},"duration":{"startDate":"2018-08-16T18:30:00.000Z","startTime":"00:00","endDate":"2018-08-17T18:30:00.000Z","endTime":"00:00"}});
  }

  ngOnInit() {
  }

  createCouponForm() {

    this.couponForm = new FormGroup({
      discountCode: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      comments: new FormControl(null),
      discountOptions: this.fb.group({
        type: new FormControl(null, Validators.required),
        value: new FormControl(null, Validators.required),
        validFor: new FormControl(null, Validators.required)
      }),
      minRequirement: this.fb.group({
        minimum: new FormControl(null, Validators.required),
        minvalue: new FormControl()
      }),
      limits: this.fb.group({
        isTotalLimit: new FormControl(),
        totalLimit: new FormControl(),
        limitOne: new FormControl()
      }),
      duration: this.fb.group({
        startDate: new FormControl(null, Validators.required),
        startTime: new FormControl(null, Validators.required),
        endDate: new FormControl(null, Validators.required),
        endTime: new FormControl(null, Validators.required)
      })
    })

  }

  resetCouponForm() {
    this.couponForm.reset();
    setTimeout(() => {
      this.couponProvider.isLoaded = false;
    }, 200);
  }

  fillCouponForm() {
    if (this.couponProvider.couponDetail) {

      console.log(this.couponProvider.couponDetail);

      if (this.couponProvider.couponDetail.discountOptions.validFor !== "global") {
        let selectedPartner = this.couponProvider.couponDetail.discountOptions.validFor;
        this.partnerList.forEach((partner) => {
          if (partner.partnerID === selectedPartner.partnerID) {
            this.selectedPartner = partner;
          }
        })
      }

      this.couponForm.patchValue(this.couponProvider.couponDetail);
    }
  }

  compareFn(t1, t2) {
    if (typeof(t1) === "object" && t2 !== null) {
      if (t1.partnerID === t2.partnerID) {
        return true;
      } else {
        return false;
      }
    }
  }

  toggleValueType() {
    
    this.couponForm.controls['discountOptions']['controls']['value'].reset();

    if (this.couponForm.controls['discountOptions']['controls']['type'].value === "percentage") {
      this.couponForm.controls['discountOptions']['controls']['value'].setValidators([Validators.required, Validators.max(100)]);
    } else {
      this.couponForm.controls['discountOptions']['controls']['value'].setValidators([Validators.required]);
    }

  }

  // Minimum requirement - Minimum purchase amount > minvalue
  toggleMinimum() {
    
    this.couponForm.controls['minRequirement']['controls']['minvalue'].clearValidators();
    
    if (this.couponForm.controls['minRequirement']['controls']['minimum'].value === "minimum") {
      this.couponForm.controls['minRequirement']['controls']['minvalue'].setValidators(Validators.required)
    } else {
      this.couponForm.controls['minRequirement']['controls']['minvalue'].clearValidators();
      this.couponForm.controls['minRequirement']['controls']['minvalue'].reset();
    }

  }

  toggleLimitValidation() {

    if (this.couponForm.controls['limits']['controls']['isTotalLimit'].value === true) {
      this.couponForm.controls['limits']['controls']['totalLimit'].setValidators(Validators.required);
    } else {
      this.couponForm.controls['limits']['controls']['totalLimit'].clearValidators()
      // ['controls']['totalLimit'].clearValidators();
    }

    this.couponForm.controls['limits']['controls']['totalLimit'].reset();

  }

  setEndDate() {
    let minDate = new Date(this.couponForm.controls['duration']['controls']['startDate'].value);
    this.minEndDate = minDate;
    this.couponForm.controls['duration']['controls']['endDate'].reset();
  }

  submitCoupon() {
    
    if (this.couponForm.valid) {
      console.log(this.couponForm.value);

      let coupon = this.couponForm.value;

      // Updating coupon
      if (this.couponProvider.couponDetail) {

        this.couponProvider.updateCoupon(coupon, this.couponProvider.couponDetail.id).subscribe(
          () => {

            this.couponProvider.getAllCoupons().subscribe(
              response => {
                this.couponProvider.couponList = response['coupons'];
                this.couponProvider.couponDetail = null;
                this.couponForm.reset();
                this.snackBar.open("Coupon updated successfully", 'OK')
              }
            )

          }, err => {
            this.snackBar.open("Error creating coupon", 'OK');
          }
        );

      } else { // Creating new Coupon

        this.couponProvider.saveCoupon(coupon).subscribe(
          () => {

            this.couponProvider.getAllCoupons().subscribe(
              response => {
                this.couponProvider.couponList = response['coupons']
                this.couponForm.reset();
                this.snackBar.open("Coupon created successfully", 'OK')
              }
            )

          }, err => {
            this.snackBar.open("Error creating coupon", 'OK');
          }
        )

      }


    } else {

      alert("Form is incomplete. Please check and try again");

    }
  }

}
