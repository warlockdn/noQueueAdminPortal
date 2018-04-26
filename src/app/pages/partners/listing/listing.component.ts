import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { PartnerService } from '../../../service/partner/partner.service';
import { MenuManagerService } from '../../../service/menu-manager/menu-manager.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class PartnerListingComponent implements OnInit {

  listingType: string = 'All';

  displayedColumns = ['partnerid', 'name', 'location', 'state', 'revenue', 'commissions', 'isActive', 'actions'];
  dataSource: any;a
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private partner: PartnerService, private menuService: MenuManagerService, private route: ActivatedRoute) {  }

  ngOnInit() {
    this.partner.getAllPartners().then((result) => {
      const activePage = (this.route.snapshot.params.type).toString();
      let partners = result.data;
      let temp = [];
      partners.map((partner) => {
        if (activePage === 'all') {
          temp.push(partner);
        } else if (activePage === 'pending' && partner.isPending === true) {
          temp.push(partner);
        } else if (activePage === 'active' && partner.isActive === true) {
          temp.push(partner);
        } else {
          throw new Error('Error traversing list');
        }
      })
      this.dataSource = temp;
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


