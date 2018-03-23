import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { CommonService } from './../../../service/common/common.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  dialogRef: MatDialogRef<ViewTransaction> | null;

  displayedColumns = ['transactionID', 'partnerName', 'partnerID', 'orderID', 'customerName', 'total', 'commission', 'percent', 'actions'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private common: CommonService, public dialog: MatDialog) { 
    this.common.title = 'Transactions'
  }

  ngOnInit() {
  }

  viewDetails(data) {    

    const dialogRef = this.dialog.open(ViewTransaction, {
      width: '450px',
      maxHeight: '700px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'view-transaction',
  templateUrl: 'view-transaction.html',
  styleUrls: ['./transactions.component.scss']
})

export class ViewTransaction {
  constructor(
    public dialogRef: MatDialogRef<ViewTransaction>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }
}


export interface Element {
  transactionID: number;
  partnerName: string;
  partnerID: number;
  orderID: number;
  customerName: string,
  total: number,
  commission: number,
  percent: number
}

const ELEMENT_DATA: Element[] = [
  { transactionID: 1220022125, partnerName: 'Pra Pra Prank', partnerID: 201125225, orderID: 100000, customerName: 'John Doe', total: 500, commission: 20, percent: 2 },
  { transactionID: 1220022125, partnerName: 'The Runway Project', partnerID: 201125225, orderID: 100000, customerName: 'John Doe', total: 500, commission: 20, percent: 2 },
  { transactionID: 1220022125, partnerName: 'BoHo by Nagai', partnerID: 201125225, orderID: 100000, customerName: 'John Doe', total: 500, commission: 20, percent: 2 },
  { transactionID: 1220022125, partnerName: 'Pra Pra Prank', partnerID: 201125225, orderID: 100000, customerName: 'John Doe', total: 500, commission: 20, percent: 2 },
  { transactionID: 1220022125, partnerName: 'The Runway Project', partnerID: 201125225, orderID: 100000, customerName: 'John Doe', total: 500, commission: 20, percent: 2 },
  { transactionID: 1220022125, partnerName: 'BoHo by Nagai', partnerID: 201125225, orderID: 100000, customerName: 'John Doe', total: 500, commission: 20, percent: 2 },
];
