import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { ParamMap, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PartnerService } from '../../../service/partner/partner.service';
import { MenuManagerService } from '../../../service/menu-manager/menu-manager.service';

export interface Element {
  partnerID: number;
  name: string;
  city: string;
  state: string;
  revenue: number,
  commissions: number,
  active: boolean,
  pending: boolean
}

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class PartnerListingComponent implements OnInit {

  listingType: string = 'All';
  partners: Array<Element>;
  all: Array<Element> = [];
  pending: Array<Element> = [];
  active: Array<Element> = [];
  displayedColumns = ['partnerid', 'name', 'location', 'state', 'revenue', 'commissions', 'isActive', 'actions'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private partner: PartnerService, private menuService: MenuManagerService, private route: ActivatedRoute, public dialog: MatDialog) {
    this.getAllPartners();
  }

  ngOnInit() {}

  editPartner(partnerID) {
    this.router.navigate(['partner', 'edit', partnerID]);
  }

  getAllPartners() {
    this.partner.getAllPartners().then((result) => {
      const activePage = (this.route.snapshot.params.type).toString();
      this.partners = result.data;

      // Clear all first..
      this.pending = [];
      this.active = [];
      this.all = [];

      this.partners.map((partner: Element) => {
        this.all.push(partner);
        if (partner.pending === true) {
          this.pending.push(partner);
        } else if (partner.active === true) {
          this.active.push(partner);
        } else {
          
        }
      })

      if (activePage === 'all') {
        this.dataSource = this.all;
      } else if (activePage === 'pending') {
        this.dataSource = this.pending;
      } else if (activePage === 'active') {
        this.dataSource = this.active;
      }

      console.log(this.listingType);

      this.route.url.subscribe(url =>{
        const activeRoute = (this.route.snapshot.params.type).toString();
        console.log('Loading: ' + activeRoute);
        if (activeRoute === 'all') {
          this.dataSource = this.all;
          this.listingType = 'All';
        } else if (activeRoute === 'pending') {
          this.dataSource = this.pending;
          this.listingType = 'Pending'
        } else if (activeRoute === 'active') {
          this.dataSource = this.active;
          this.listingType = 'Active';
        }
      });

    }).catch((err) => {
      console.log(err);
    })
  }

  manageMenu(partnerID) {
    this.router.navigate(['manage-menu', partnerID]);
  }

  setStatus(partner) {
    const dialogRef = this.dialog.open(PartnerStatus, {
      width: '350px',
      data: partner
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.partner.setPartnerStatus(result.partner.partnerID, result.status).then((success) => {
          this.getAllPartners();
        }).catch((err) => {
          alert(err);
        })
      }
    });
  }

}

@Component({
  selector: 'partner-status',
  template: `
    <h1 mat-dialog-title>Partner Status</h1>
    <div mat-dialog-content>
      <p>Please review the menu and details carefully and then proceed to activate or deactivate a Partner</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button cdkFocusInitial color="primary" (click)="activate()">Activate</button>
      <button mat-button (click)="pending()">Pending</button>
      <button mat-button (click)="onNoClick()">Cancel</button>
    </div>
  `,
})

export class PartnerStatus {

  title: string = 'Add';

  constructor(
    public dialogRef: MatDialogRef<PartnerStatus>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  pending(): void {
    this.dialogRef.close({
      status: false,
      partner: this.data
    });
  }

  activate(): void {
    this.dialogRef.close({
      status: true,
      partner: this.data
    });
  }

}