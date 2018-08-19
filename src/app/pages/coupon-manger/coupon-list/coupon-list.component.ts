import { Component, OnInit, Inject } from '@angular/core';

import { CouponsService, Coupon } from '../../../service/coupons/coupons.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.scss']
})
export class CouponListComponent implements OnInit {

  constructor(public couponProvider: CouponsService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  addNewCoupon() {
    this.couponProvider.couponDetail = null;
    setTimeout(() => {
      this.couponProvider.isLoaded = true;
    }, 200);
  }

  loadCoupon(coupon: Coupon) {
    this.couponProvider.couponDetail = coupon;
    setTimeout(() => {
      this.couponProvider.isLoaded = true;
    }, 200);
  }

  couponActions(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  deleteCoupon(coupon, index) {

    const deleteDialog = this.dialog.open(DialogDeleteCoupon, {
      width: '200px'
    })

    deleteDialog.afterClosed().subscribe(result => {
      if (result) {
        this.couponProvider.deleteCoupon(coupon.id).subscribe(
          response => {
            this.couponProvider.couponList.splice(index, 1);
          }
        )
      }
    })

  }

  couponStatus(id, status) {
    this.couponProvider.setCouponStatus(id, status).subscribe(
      response => {
        this.snackBar.open("Coupon status updated successfully", "OK");
      }, err => {
        this.snackBar.open("Error updating coupon status", "OK");
      }
    )
  }

}

@Component({
  selector: 'dialog-category',
  template: `
    <h1 mat-dialog-title>Are you sure?</h1>
    <div mat-dialog-content>
      <p>Are you sure you want to delete coupon.</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">CANCEL</button>
      <button mat-button cdkFocusInitial (click)="delete()">DELETE</button>
    </div>
  `,
})

export class DialogDeleteCoupon {

  title: string = 'Add';

  constructor(public dialogRef: MatDialogRef<DialogDeleteCoupon>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete() {
    this.dialogRef.close(true);
  }

}