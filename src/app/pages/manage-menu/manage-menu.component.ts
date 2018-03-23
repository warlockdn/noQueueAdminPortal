import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { CommonService } from './../../service/common/common.service';
import { MenuManagerService } from '../../service/menu-manager/menu-manager.service';

@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.scss']
})
export class ManageMenuComponent implements OnInit {

  menu: any = {};
  isCategorySelected: boolean = false;

  constructor(public dialog: MatDialog, private common: CommonService, private menuService: MenuManagerService) {
    this.common.title = 'Manage Menu';
    this.menu = this.menuService.getMenu()
  }

  ngOnInit() {
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(DialogNewCategory, {
      width: '250px',
      data: {
        type: 'edit'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialog(type): void {    

    const dialogRef = this.dialog.open(DialogNewCategory, {
      width: '250px',
      data: {
        type: type
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  deleteCategory() {

    // Stop parent function to run
    event.stopPropagation();

    console.log('Delete Category');
    const dialogRef = this.dialog.open(DeleteCategory, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  loadCategory(item) {
    console.log('Loading Category');
    this.isCategorySelected = true;



  }

}

@Component({
  selector: 'dialog-category',
  template: `
    <h1 mat-dialog-title>{{ title }} Category</h1>
    <div mat-dialog-content>
      <p>Enter a name for your category and Save.</p>
      <mat-form-field>
        <input matInput placeholder="Category Name">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">CANCEL</button>
      <button mat-button cdkFocusInitial>SUBMIT</button>
    </div>
  `,
})

export class DialogNewCategory {

  title: string = 'Add';

  constructor(
    public dialogRef: MatDialogRef<DialogNewCategory>, @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);

      if ( data.type !== 'new' ) {
        this.title = 'Edit';
      }

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-category-delete',
  template: `<h1 mat-dialog-title>Delete Category</h1>
  <div mat-dialog-content>
    <p>Are you sure you want to delete <strong>Category Name</strong></p>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">CANCEL</button>
    <button mat-button cdkFocusInitial color="warn">DELETE</button>
  </div>`,
})

export class DeleteCategory {

  title: string = 'Add';

  constructor(
    public dialogRef: MatDialogRef<DeleteCategory>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'empty-selection',
  template: `<div class="empty d-flex align-items-center justify-content-center flex-column text-center">
    <mat-icon class="ion-ios-information"></mat-icon>
    <p>
      Select a Category from Left Panel
      <br>
      to Manage Menu
    </p>
  </div>`,
  styleUrls: ['./manage-menu.component.scss']
})

export class NoCategorySelected {
  constructor() {}
}