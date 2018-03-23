import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class PartnerListingComponent implements OnInit {

  listingType: string = 'All';

  displayedColumns = ['partnerid', 'name', 'location', 'state', 'revenue', 'commissions', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router) {  }

  ngOnInit() {
  }

  editPartner(partnerID) {
    this.router.navigate(['partner', 'edit', partnerID]);
  }

}

export interface Element {
  partnerid: number;
  name: string;
  location: string;
  state: string;
  revenue: number,
  commissions: number,
  isActive: string,  
}

const ELEMENT_DATA: Element[] = [
  { partnerid: 1220022125, name: 'Pra Pra Prank', location: 'Gurgaon', state: 'Haryana', revenue: 222058, commissions: 12000, isActive: 'Yes' },
  { partnerid: 1220022125, name: 'The Runway Project', location: 'Gurgaon', state: 'Haryana', revenue: 222058, commissions: 12000, isActive: 'Yes' },
  { partnerid: 1220022125, name: 'BoHo by Nagai', location: 'Gurgaon', state: 'Haryana', revenue: 222058, commissions: 12000, isActive: 'Yes' },
  { partnerid: 1220022125, name: 'Pra Pra Prank', location: 'Gurgaon', state: 'Haryana', revenue: 222058, commissions: 12000, isActive: 'Yes' },
  { partnerid: 1220022125, name: 'The Runway Project', location: 'Gurgaon', state: 'Haryana', revenue: 222058, commissions: 12000, isActive: 'Yes' },
  { partnerid: 1220022125, name: 'BoHo by Nagai', location: 'Gurgaon', state: 'Haryana', revenue: 222058, commissions: 12000, isActive: 'Yes' },
];


