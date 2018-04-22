import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MenuManagerService } from '../../../service/menu-manager/menu-manager.service';

@Component({
  selector: 'manage-item',
  templateUrl: './manage-item.component.html',
  styleUrls: ['./manage-item.component.scss']
})
export class ManageMenuItemComponent implements OnInit {

  detailsForm: FormGroup;
  quantityForm: FormGroup;
  extrasForm: FormGroup;
  menuItem: any = {};

  constructor(
    private fb: FormBuilder, private menuService: MenuManagerService) {
      
    this.menuItem = this.menuService.itemSelected;
    
    this.createDetailsForm();
    this.createQuantityForm();
    this.createExtrasForm();
    
    // Add default Items (Quantity Form)
    if (!this.menuItem.addons) {
      this.addQuantity(null);
      this.addQuantity(null);
    }

    // Add default Items (Extras Form)
    if (!this.menuItem.addons) {
      this.addExtra(null);
      this.addExtra(null);
    }
  }

  ngOnInit() { }


  // Details Form

  createDetailsForm() {
    // Create Quantity Form
    if (Object.keys(this.menuItem).length > 0) {
      this.detailsForm = this.fb.group({
        name: new FormControl(this.menuItem.name, Validators.required),
        price: new FormControl(this.menuItem.price, Validators.required),
        isNonVeg: new FormControl(this.menuItem.isNonVeg),
        description: new FormControl(this.menuItem.description)
      })
    } else {
      this.detailsForm = this.fb.group({
        name: new FormControl('', Validators.required),
        price: new FormControl(null, Validators.required),
        isNonVeg: new FormControl(false),
        description: new FormControl('')
      })
    }
  }


  // Quantity Form

  createQuantityForm() {
    // Create Quantity Form
    this.quantityForm = this.fb.group({
      quantities: this.fb.array([])
    })
    if (this.menuItem.addons) {
      this.addQuantity(this.menuItem.addons.quantity);
    }
  }

  get quantities(): FormArray {
    return this.quantityForm.get('quantities') as FormArray;
  }

  addQuantity(quantities) {
    if (quantities) {
      quantities.forEach(quantity => {
        this.quantities.push(this.fb.group({
          title: [quantity.title, [Validators.required]],
          price: [quantity.price, [Validators.required]],
          isNonVeg: [quantity.isNonVeg]
        }));
      });
    } else {
      this.quantities.push(this.fb.group({
        title: ['', [Validators.required]],
        price: [null, [Validators.required]],
        isNonVeg: [false]
      }));
    }
  }

  deleteQuantity(index) {
    this.quantities.removeAt(index);
  }

  
  // Extras

  createExtrasForm() {
    // Create Quantity Form
    this.extrasForm = this.fb.group({
      extras: this.fb.array([])
    })
    if (this.menuItem.addons) {
      this.addExtra(this.menuItem.addons.extras);
    }
  }

  get extras(): FormArray {
    return this.extrasForm.get('extras') as FormArray;
  }

  addExtra(extras) {
    if (extras) {
      extras.forEach(extra => {
        this.extras.push(this.fb.group({
          title: [extra.title, [Validators.required]],
          price: [extra.price, [Validators.required]],
          isNonVeg: [extra.isNonVeg]
        }));  
      });
    } else {
      this.extras.push(this.fb.group({
        title: ['', [Validators.required]],
        price: [null, [Validators.required]],
        isNonVeg: [false]
      }));
    }
  }

  deleteExtras(index) {
    this.extras.removeAt(index);
  }

  saveItem() {
    if (!this.detailsForm.invalid) {
      const addons = {
        quantity: this.quantityForm.value.quantities || null,
        extras: this.extrasForm.value.extras || null
      };
  
      this.menuService.saveItem(this.detailsForm.value, addons, null);
      this.menuService.isAdding = false;
    }
  }

  cancel() {
    this.menuService.isAdding = false;
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