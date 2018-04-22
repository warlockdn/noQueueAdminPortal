import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'manage-item',
  templateUrl: './manage-item.component.html',
  styleUrls: ['./manage-item.component.scss']
})
export class ManageMenuItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

/* @Component({
  selector: 'add-customization',
  template: `
  <h3 class="subtitle" *ngIf="!isEditable">{{ title }}</h3>
  <mat-form-field class="full-width" *ngIf="isEditable">
    <input matInput placeholder="Add Title" value="Your custom title" class="title">
  </mat-form-field>
  <div class="wrapper">
    <div class="row header">
      <div class="col col-6">Title</div>
      <div class="col col-2">Diff. Price</div>
      <div class="col col-2">Non-Veg</div>
      <div class="col col-2"></div>
    </div>    
    <div #item></div>
    <div class="d-flex justify-content-end">
      <button mat-icon-button color="warn" class="mat-elevation-z0 mr-2" type="button" *ngIf="isEditable">
        <mat-icon class="ion-trash-b" (click)="deleteCustomization()"></mat-icon>
      </button>
      <button mat-icon-button class="mat-elevation-z0 mr-2" type="button">
        <mat-icon class="ion-plus-round" (click)="addItem()"></mat-icon>
      </button>
      <button mat-icon-button color="green" class="mat-elevation-z0" type="button">
        <mat-icon class="ion-checkmark" (click)="saveCustomization()"></mat-icon>
      </button>
    </div>
  </div>
  `,
  styleUrls: ['./manage-item.component.scss']
})
export class AddCustomizationComponent implements OnInit {

  @ViewChild('item', { read: ViewContainerRef }) itemContainer: ViewContainerRef;

  @Input('title') title = 'Customization Title';
  @Input('isEditable') isEditable = true;
  _ref: any;

  constructor(private _cfr: ComponentFactoryResolver) {}

  ngOnInit() {
    if (!this.title || this.title == '') {
      this.title = 'Customization Title';
    }
    this.addItem(); // Quantities
    this.addItem(); // Extras
  }

  addItem() {
    const comp = this._cfr.resolveComponentFactory(AddItemComponent);
    let expComponent = this.itemContainer.createComponent(comp);
  }

  // Delete
  deleteCustomization() {
    this._ref.destroy();
  }

  saveCustomization() {} 

}

@Component({
  selector: 'add-item',
  template: `
    <div class="row body">
      <div class="col col-6">
        <mat-form-field class="full-width">
          <input matInput placeholder="Quantity Title">
        </mat-form-field>
      </div>
      <div class="col col-2">
        <mat-form-field class="full-width">
          <input matInput placeholder="Price" type="number">
        </mat-form-field>
      </div>
      <div class="col col-2 align-self-center">
        <mat-slide-toggle></mat-slide-toggle>
      </div>
      <div class="col col-2 align-self-center">
        <button mat-icon-button color="warn" class="mat-elevation-z0" type="button">
          <mat-icon class="ion-android-close" (click)="deleteItem()"></mat-icon>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./manage-item.component.scss']
})
export class AddItemComponent implements OnInit {

  _cfr: any;

  ngOnInit() {
    
  }

  deleteItem() {
    this._cfr.destroy();
  }
  
} */