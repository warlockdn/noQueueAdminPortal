import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';

import { PartnerService } from '../../../service/partner/partner.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class PartnerListingComponent implements OnInit {

  listingType: string = 'All';

  displayedColumns = ['partnerid', 'name', 'location', 'state', 'revenue', 'commissions', 'isActive', 'actions'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private partner: PartnerService) {  }

  ngOnInit() {
    this.partner.getAllPartners().then((result) => {
      this.dataSource = new MatTableDataSource<Element>(result.data);
    }).catch((err) => {
      console.log(err);
    })    
  }

  editPartner(partnerID) {
    this.router.navigate(['partner', 'edit', partnerID]);
  }

  manageMenu(partnerID) {
    this.router.navigate(['manage-menu', partnerID]);
  }

}

export interface Element {
  partnerID: number;
  name: string;
  city: string;
  state: string;
  revenue: number,
  commissions: number,
  active: string,
}


