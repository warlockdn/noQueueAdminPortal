import { Component, OnInit, Inject } from '@angular/core';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { CommonService } from './../../service/common/common.service';
import { MenuManagerService } from '../../service/menu-manager/menu-manager.service';

export interface Category {
  name: string,
  type: string,
  typeID: number,
  items: [{
    name: string,
    type: string,
    typeID: number,
  }]
}

@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.scss']
})
export class ManageMenuComponent implements OnInit {

  isCategorySelected: boolean = false;
  isDisabled: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private common: CommonService, private menuService: MenuManagerService, public snackBar: MatSnackBar) {
    this.common.title = 'Manage Menu';
  }

  ngOnInit() {

    const partnerID = this.route.snapshot.params.partnerid.toString();
    
    this.menuService.fetchMenu(partnerID).then((success) => {
      this.menuService.menu = success.data;
      this.menuService.saveMenu(success.data);
    }).catch((err) => {
      console.log(err)
    })

  }

  openEditDialog(type, item, index): void {

    // Stop parent function to run
    event.stopPropagation();

    const dialogRef = this.dialog.open(DialogNewCategory, {
      width: '250px',
      data: {
        type: type,
        name: item.name,
        index: index
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.menuService.editCategory(result.index, result.name)
      }
    });
  }

  // Create New Category
  createCategory(type): void {    

    const dialogRef = this.dialog.open(DialogNewCategory, {
      width: '250px',
      data: {
        type: type
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.menuService.createCategory({
          name: result.name.toString()
        });
      }
    });

  }

  deleteCategory(item, index) {

    // Stop parent function to run
    event.stopPropagation();

    console.log('Delete Category', item.name);
    const dialogRef = this.dialog.open(DeleteCategory, {
      width: '250px',
      data: {
        name: item.name,
        index: index
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.status) {
        this.menuService.deleteCategory(result.index)
        // Bring back to Idle state (none selected).
        if (item.selected) {
          this.isCategorySelected = false;
        }
      }
    });

  }

  loadCategory(item) {
    console.log('Loading Category');

    // Deselect all menu's
    this.menuService.menu.map((item) => {
      item.selected = false;
    });

    item.selected = true;
    this.menuService.loadCategory(item);
    
    // Show Category Data
    this.isCategorySelected = true;

  }

  uploadMenu(type) {
    // Disable buttons.
    this.isDisabled = true;
    const partnerID = this.route.snapshot.params.partnerid.toString();
    this.menuService.uploadMenu(partnerID, type).then((respose) => {
      this.isDisabled = false;
      this.router.navigate(['partner']);
    }).catch((err) => {
      this.snackBar.open('Error updating menu. Try again.', 'Close', {
        duration: 3000,
      });
      this.isDisabled = false;
    })
  }

}

@Component({
  selector: 'dialog-category',
  template: `
    <h1 mat-dialog-title>{{ title }} Category</h1>
    <div mat-dialog-content>
      <p>Enter a name for your category and Save.</p>
      <mat-form-field>
        <input matInput placeholder="Category Name" [(ngModel)]="data.name">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">CANCEL</button>
      <button mat-button cdkFocusInitial [mat-dialog-close]="data">SUBMIT</button>
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
  template: `
    <h1 mat-dialog-title>Delete Category</h1>
    <div mat-dialog-content>
      <p>Are you sure you want to delete <strong>{{ data.name }}</strong></p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">CANCEL</button>
      <button mat-button cdkFocusInitial color="warn" (click)="delete()">DELETE</button>
    </div>
  `,
})

export class DeleteCategory {

  title: string = 'Add';

  constructor(
    public dialogRef: MatDialogRef<DeleteCategory>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.dialogRef.close({
      status: true,
      index: this.data.index
    });
  }

}

@Component({
  selector: 'empty-selection',
  template: `
    <div class="empty d-flex align-items-center justify-content-center flex-column text-center">
      <mat-icon class="ion-ios-information"></mat-icon>
      <p>
        Select a Category from Left Panel
        <br>
        to Manage Menu
      </p>
    </div>
  `,
  styleUrls: ['./manage-menu.component.scss']
})

export class NoCategorySelected {
  constructor() {}
}