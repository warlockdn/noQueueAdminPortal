import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { CommonService } from '../../../service/common/common.service';
import { MenuManagerService } from '../../../service/menu-manager/menu-manager.service';

@Component({
  selector: 'manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {

  items: any;
  isAdding: boolean = false;

  constructor(public dialog: MatDialog, public menuService: MenuManagerService, public common: CommonService) {
    
  }

  ngOnInit() {
  }

  addNewItem() {
    this.isAdding = true;    
  }

  editProduct(item) {
    this.isAdding = true;
  }

  deleteProduct(item) {
    
    const dialogRef = this.dialog.open(DeleteProduct, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

}

@Component({
  selector: 'dialog-product-delete',
  template: `<h1 mat-dialog-title>Delete Item</h1>
  <div mat-dialog-content>
    <p>Are you sure you want to delete <strong>Item Name</strong></p>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">CANCEL</button>
    <button mat-button cdkFocusInitial color="warn">DELETE</button>
  </div>`,
})

export class DeleteProduct {

  title: string = 'Add';

  constructor(
    public dialogRef: MatDialogRef<DeleteProduct>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
