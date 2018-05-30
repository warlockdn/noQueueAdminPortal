import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteCategoryV2 } from '../manage-menu-v2/manage-menu-v2.component';

@Component({
  selector: 'app-item-selection',
  templateUrl: './item-selection.component.html',
  styleUrls: ['./item-selection.component.scss']
})
export class ItemSelectionComponent implements OnInit {

  items: any;
  selectedItems: any = [];

  constructor(public dialogRef: MatDialogRef<DeleteCategoryV2>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.items = data.items;
  }

  ngOnInit() {
  }

  confirm() {

    let items = new Array();
    
    this.selectedItems.map(item => {
      items.push(item.id)
    });

    console.log(items);

    this.dialogRef.close({
      itemIds: items,
      items: this.selectedItems
    });
  }

  close() {
    this.dialogRef.close();
  }

}
