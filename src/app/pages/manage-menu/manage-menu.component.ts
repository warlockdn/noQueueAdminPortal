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

  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private common: CommonService, public menuService: MenuManagerService, public snackBar: MatSnackBar) {
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

    /* this.menuService.menu = [{
      "name": "Italian",
      "isMain": true,
      "items": [{
          "name": "Pizza",
          "items": [{
              "name": "Farmhouse",
              "price": "200",
              "isNonVeg": false,
              "description": "",
              "isEnabled": true,
              "hasAddons": true,
              "addons": {
                  "quantity": [{
                      "title": "Small",
                      "price": 0,
                      "isNonVeg": false
                  }, {
                      "title": "Med",
                      "price": 50,
                      "isNonVeg": false
                  }, {
                      "title": "Large",
                      "price": 100,
                      "isNonVeg": false
                  }],
                  "extras": [{
                      "title": "Cheese",
                      "price": 50,
                      "isNonVeg": false
                  }, {
                      "title": "Paneer",
                      "price": 50,
                      "isNonVeg": false
                  }]
              }
          }, {
              "name": "Farmhouse",
              "price": "200",
              "isNonVeg": false,
              "description": "",
              "isEnabled": true,
              "hasAddons": true,
              "addons": {
                  "quantity": [{
                      "title": "Small",
                      "price": 0,
                      "isNonVeg": false
                  }, {
                      "title": "Med",
                      "price": 50,
                      "isNonVeg": false
                  }, {
                      "title": "Large",
                      "price": 100,
                      "isNonVeg": false
                  }],
                  "extras": [{
                      "title": "Cheese",
                      "price": 50,
                      "isNonVeg": false
                  }, {
                      "title": "Paneer",
                      "price": 50,
                      "isNonVeg": false
                  }]
              }
          }]
      }, {
          "name": "Delicasy",
          "items": [{
              "name": "Farmhouse",
              "price": "200",
              "isNonVeg": false,
              "description": "",
              "isEnabled": true,
              "hasAddons": true,
              "addons": {
                  "quantity": [{
                      "title": "Small",
                      "price": 0,
                      "isNonVeg": false
                  }, {
                      "title": "Med",
                      "price": 50,
                      "isNonVeg": false
                  }, {
                      "title": "Large",
                      "price": 100,
                      "isNonVeg": false
                  }],
                  "extras": [{
                      "title": "Cheese",
                      "price": 50,
                      "isNonVeg": false
                  }, {
                      "title": "Paneer",
                      "price": 50,
                      "isNonVeg": false
                  }]
              }
          }, {
              "name": "Farmhouse",
              "price": "200",
              "isNonVeg": false,
              "description": "",
              "isEnabled": true,
              "hasAddons": true,
              "addons": {
                  "quantity": [{
                      "title": "Small",
                      "price": 0,
                      "isNonVeg": false
                  }, {
                      "title": "Med",
                      "price": 50,
                      "isNonVeg": false
                  }, {
                      "title": "Large",
                      "price": 100,
                      "isNonVeg": false
                  }],
                  "extras": [{
                      "title": "Cheese",
                      "price": 50,
                      "isNonVeg": false
                  }, {
                      "title": "Paneer",
                      "price": 50,
                      "isNonVeg": false
                  }]
              }
          }]
      }]
    }, {
        "name": "Pasta",
        "items": [{
            "name": "Alfredo",
            "price": "200",
            "isNonVeg": false,
            "description": "",
            "isEnabled": true,
            "hasAddons": true,
            "addons": {
                "quantity": [{
                    "title": "Small",
                    "price": 0,
                    "isNonVeg": false
                }, {
                    "title": "Med",
                    "price": 50,
                    "isNonVeg": false
                }, {
                    "title": "Large",
                    "price": 100,
                    "isNonVeg": false
                }],
                "extras": [{
                    "title": "Cheese",
                    "price": 50,
                    "isNonVeg": false
                }, {
                    "title": "Paneer",
                    "price": 50,
                    "isNonVeg": false
                }]
            }
        }, {
            "name": "White Sauce",
            "price": "200",
            "isNonVeg": false,
            "description": "",
            "isEnabled": true,
            "hasAddons": true,
            "addons": {
                "quantity": [{
                    "title": "Small",
                    "price": 0,
                    "isNonVeg": false
                }, {
                    "title": "Med",
                    "price": 50,
                    "isNonVeg": false
                }, {
                    "title": "Large",
                    "price": 100,
                    "isNonVeg": false
                }],
                "extras": [{
                    "title": "Cheese",
                    "price": 50,
                    "isNonVeg": false
                }, {
                    "title": "Paneer",
                    "price": 50,
                    "isNonVeg": false
                }]
            }
        }]
    }];

    this.menuService.saveMenu(this.menuService.menu); */

  }

  deselectAll() {
    // Deselect all menu's
    this.menuService.menu.map((item) => {
      delete item.selected;
      if (item.items) {
        item.items.map((item) => {
          delete item.selected;
        })
      }
    });
  }

  openEditDialog(type, item, index, subIndex): void {

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
        if (subIndex !== null) {
          this.menuService.editSubCategory(index, subIndex, result.name);
        } else {
          this.menuService.editCategory(result.index, result.name);
        }
      }
    });
  }

  // Create New Category
  createCategory(type, item, index): void {

    // Stop parent function to run
    event.stopPropagation();

    const dialogRef = this.dialog.open(DialogNewCategory, {
      width: '250px',
      data: {
        type: type
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.name) {
        if (item === null) { // Create Normal Category
          this.menuService.createCategory({
            name: result.name.toString(),
            isNew: true
          });
        } else { // Create Sub Category
          this.menuService.createSubCategory({
            name: result.name.toString()
          }, index)

          // Convert Item to Main
          item.isMain = true;
          delete item.isNew;
          delete item.selected;
        }
      }
    });

  }

  deleteCategory(item, index, subIndex) {

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
      if(result) {
        if (subIndex !== null) {
          this.menuService.deleteSubCategory(result.index, subIndex);
        } else {
          this.menuService.deleteCategory(result.index);
        }
        // Bring back to Idle state (none selected).
        if (item.selected) {
          this.isCategorySelected = false;
        }
      }
    });

  }

  loadCategory(item, isChild, event) {
    
    event.stopPropagation();

    if (item.isMain && item.isNew !== true) {
      return;
    }

    // Reset Selected first.
    item.selected = false;
    this.isCategorySelected = false;

    console.log('Loading Category');
    
    // Deselect all menu's
    this.menuService.menu.map((item) => {
      delete item.selected;
      if (item.items) {
        item.items.map((item) => {
          delete item.selected;
        })
      }
    });

    item.selected = true;
    this.menuService.loadCategory(item, isChild);
    
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
        Select a Category or Item from Left Panel
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