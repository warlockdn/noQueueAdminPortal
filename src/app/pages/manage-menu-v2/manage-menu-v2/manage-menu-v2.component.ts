import { Component, OnInit, Inject } from '@angular/core';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTabChangeEvent } from '@angular/material';

import { CommonService } from '../../../service/common/common.service';
import { MenuManagerService } from '../../../service/menu-manager/menu-manager.service';
import { MenuManagerV2Service } from '../../../service/menu-manager-v2/menu-manager-v2.service';

@Component({
  selector: 'app-manage-menu-v2',
  templateUrl: './manage-menu-v2.component.html',
  styleUrls: ['./manage-menu-v2.component.scss']
})
export class ManageMenuV2Component implements OnInit {  

  isDisabled: boolean = false;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, private common: CommonService, public menuService: MenuManagerService, public menuServiceV2: MenuManagerV2Service, public router: Router, public route: ActivatedRoute) {
    this.common.title = 'Menu Manager';
  }

  ngOnInit() {
    this.menuServiceV2.setPartnerID(parseInt(this.route.snapshot.params.partnerid.toString()));

    this.fetchItems(parseInt(this.route.snapshot.params.partnerid.toString()));

    // Demo
    // this.menuServiceV2.setCollections([{"name":"D","subcollection":[{"name":"X"}]},{"name":"D"},{"name":"D"}]);
  }

  loadType = (tabChangeEvent: MatTabChangeEvent): void => {
    if (tabChangeEvent["tab"].textLabel === 'Categories') {
      console.log('Loading Categories');
    } else {
      console.log('Loading Items');
    }
    
    this.menuServiceV2.showEmpty = true;
    this.menuServiceV2.showItem = false;
    this.menuServiceV2.showCategory = false;
  }

  uploadMenu(type) {
    this.menuServiceV2.uploadMenu(type).then((response) => {
      this.router.navigate(['partner']);
    }).catch((err) => {
      this.snackBar.open('Error updating menu. Try again.', 'Close', {
        duration: 8000,
      });
    });
  }

  fetchCollections(partnerID) {
    this.menuServiceV2.fetchCollections(partnerID)
    .then(response => {

      let collections = new Array();
      let menuItems = this.menuServiceV2.getItems();

      response.collections.forEach(collection => {
        if (collection.items) {
          let tempItems = new Array();
          
          collection.items.forEach(item => {
            tempItems.push(menuItems[item.id])
          });
          
          collections.push({
            name: collection.name,
            items: tempItems
          });

        } else if (collection.subcollection) {
          let tempItems = new Array();

          collection.subcollection.forEach(sub => {
            
            let items = new Array();
            sub.items.forEach(item => {
              items.push(menuItems[item.id]);
            });

            tempItems.push({
              name: sub.name,
              items: items
            });

          });

          collections.push({
            name: collection.name,
            subcollection: tempItems
          })
        }
      });

      this.menuServiceV2.setCollections(collections);
      this.menuServiceV2.collections = collections;

    })
    .catch(err => {
      console.log(err);
    }) 
  }

  fetchItems(partnerID) {
    this.menuServiceV2.fetchItems(partnerID)
    .then((response) => {
      let items = {};
      response.items.forEach(item => {
        items[item.id] = item;
      });
      this.menuServiceV2.setItems(JSON.stringify(items));

      this.fetchCollections(parseInt(this.route.snapshot.params.partnerid.toString()));
    })
    .catch((err) => {

    })
  }
 
  createCategory(type, item, index): void {

    // Stop parent function to run
    // event.stopPropagation();
    

    if (item !== null && item.items) {
      this.snackBar.open('Cannot add a Category if it has Items directly inside');
    }

    const dialogRef = this.dialog.open(DialogNewCategoryV2, {
      width: '250px',
      data: {
        type: type
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.name) {
        if (item === null) { // Create Normal Category
          this.menuServiceV2.createCollection({
            name: result.name.toString()
          })
        } else { // Create Sub Category
          this.menuServiceV2.createSubCollection({
            name: result.name
          }, index);
          /* // Convert Item to Main
          item.isMain = true;
          delete item.isNew;
          delete item.selected; */
        }
      }
    });

  }
  
  openEditDialog(type, item, index, subIndex): void {

    // Stop parent function to run
    // event.stopPropagation();

    const dialogRef = this.dialog.open(DialogNewCategoryV2, {
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
          this.menuServiceV2.editSubCollection({
            name: result.name
          }, index, subIndex);
        } else {
          this.menuServiceV2.editCollection({
            name: result.name
          }, index);
        }
      }
    });
  }

  deleteCategory(item, index, subIndex, event) {

    // Stop parent function to run
    // event.stopPropagation();

    const dialogRef = this.dialog.open(DeleteCategoryV2, {
      width: '250px',
      data: {
        name: item.name,
        index: index
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if (subIndex !== null) {
          // this.menuServiceV2.
          this.menuServiceV2.deleteSubCollection(result.index, subIndex);
        } else {
          this.menuServiceV2.deleteCollection(result.index);
        }
        // Bring back to Idle state (none selected).
        if (item.selected) {
          // this.isCategorySelected = false;
        }
      }
    });

  }

  loadCategory(item, index, subIndex, isChild, event) {
    
    // event.stopPropagation();

    if (!isChild) {
      if (typeof item.subcollection !== 'undefined') {
        return false;
      }
    }

    this.menuServiceV2.collections.forEach(collection => {
      collection.selected = false;
      if (collection.subcollection) {
        collection.subcollection.forEach(sub => {
          sub.selected = false;
        });
      }
    });

    item.selected = true;

    /* if (typeof item.items !== 'undefined') { // Load Items
      
      this.menuServiceV2.collections.forEach(collection => {
        collection.selected = false;
      });

      item.selected = true;
      
      
    } else { // Load Sub Collections
      
      this.menuServiceV2.collections.forEach(collection => {
        collection.selected = false;
        if (collection.subcollection) {
          collection.subcollection.forEach(sub => {
            delete sub.selected;
          });
        }
      });

    } */

    this.menuServiceV2.collectionSelected = item;
    this.menuServiceV2.collectionSelectedIndex = index;
    this.menuServiceV2.collectionChildIndex = subIndex;
    this.menuServiceV2.collectionIsChild = isChild;
    this.menuServiceV2.showEmpty = false;
    this.menuServiceV2.showItem = false;
    this.menuServiceV2.showCategory = true;

  }

  createItem (type, item): void {
    this.menuServiceV2.itemSelected = null;
    this.menuServiceV2.showEmpty = false;
    this.menuServiceV2.showItem = true;
    this.menuServiceV2.showCategory = false;
  }

  loadItem(item) {
    this.menuServiceV2.itemSelected = null;
    this.menuServiceV2.itemSelected = item;
    this.menuServiceV2.showEmpty = false;
    this.menuServiceV2.showItem = true;
    this.menuServiceV2.showCategory = false;
  }

  deleteItem(item) {

    // Stop parent function to run
    // event.stopPropagation();

    console.log('Delete Item', item.name);
    const dialogRef = this.dialog.open(DeleteCategoryV2, {
      width: '250px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.menuServiceV2.deleteItem(result.index)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        })
      }
    });

  }

}

@Component({
  selector: 'dialog-category',
  template: `
    <h1 mat-dialog-title>{{ title }} Item</h1>
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

export class DialogNewItemV2 {

  title: string = 'Add';

  constructor(
    public dialogRef: MatDialogRef<DialogNewItemV2>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
    <h1 mat-dialog-title>Delete Item</h1>
    <div mat-dialog-content>
      <p>Are you sure you want to delete <strong>{{ data.name }}</strong></p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">CANCEL</button>
      <button mat-button cdkFocusInitial color="warn" (click)="delete()">DELETE</button>
    </div>
  `,
})

export class DeleteItemV2 {

  title: string = 'Add';

  constructor(
    public dialogRef: MatDialogRef<DeleteItemV2>, @Inject(MAT_DIALOG_DATA) public data: any) {}

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

export class DialogNewCategoryV2 {

  title: string = 'Add';

  constructor(
    public dialogRef: MatDialogRef<DialogNewCategoryV2>, @Inject(MAT_DIALOG_DATA) public data: any) {
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

export class DeleteCategoryV2 {

  constructor(
    public dialogRef: MatDialogRef<DeleteCategoryV2>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.dialogRef.close({
      index: this.data.id
    });
  }

}