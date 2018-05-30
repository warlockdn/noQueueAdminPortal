import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { ItemSelectionComponent } from '../item-selection/item-selection.component';

import { CommonService } from '../../../service/common/common.service';
import { MenuManagerV2Service } from '../../../service/menu-manager-v2/menu-manager-v2.service';
@Component({
  selector: 'manage-category-v2',
  templateUrl: './manage-category-v2.component.html',
  styleUrls: ['./manage-category-v2.component.scss']
})
export class ManageCategoryV2Component implements OnInit {

  constructor(public menuServicev2: MenuManagerV2Service, public common: CommonService, public dialog: MatDialog) {}

  ngOnInit() {
  }

  addNewItem() {

    let collections = this.menuServicev2.getItems();

    let selectedCollection = this.menuServicev2.collectionSelected;
    let selectedItems = null;

    if (typeof selectedCollection["items"] !== 'undefined') {
      selectedCollection["items"].map(item => {
        collections[item.id].selected = true;
      })
    }

    let keys = Object.keys(collections);

    let newCollections = new Array(); 
    
    Object.keys(collections).map(item => {
      newCollections.push(collections[item]);
    })

    console.log(newCollections);

    const dialog = this.dialog.open(ItemSelectionComponent, {
      width: '600px',
      height: '400px',
      maxHeight: '400px',
      data: {
        items: newCollections
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (result.itemIds) {
        
        let collection = {
          name: this.menuServicev2.collectionSelected["name"],
          items: result.items
        }

        this.menuServicev2.collectionSelected["items"] = result.items;
        if (this.menuServicev2.collectionIsChild) { // update subcollection
          this.menuServicev2.updateSubCollection(collection, this.menuServicev2.collectionSelectedIndex, this.menuServicev2.collectionChildIndex);
        } else { // update collection
          this.menuServicev2.updateCollection(collection, this.menuServicev2.collectionSelectedIndex);
        }

      }
    })

  }

  deleteItem(i) {
    this.menuServicev2.collectionSelected["items"].splice(i, 1);
  }

}


