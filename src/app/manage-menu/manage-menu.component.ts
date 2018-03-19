import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { CommonService } from './../service/common/common.service';

@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.scss']
})
export class ManageMenuComponent implements OnInit {

  constructor(public dialog: MatDialog, private common: CommonService) {
    this.common.title = 'Manage Menu'
  }

  ngOnInit() {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogNewCategory, {
      width: '250px'      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');      
    });
  }

}

@Component({
  selector: 'dialog-category',
  templateUrl: 'add-category.html',
})
export class DialogNewCategory {

  constructor(
    public dialogRef: MatDialogRef<DialogNewCategory>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}