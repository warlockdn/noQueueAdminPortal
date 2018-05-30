import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { CommonService } from '../../../service/common/common.service';
import { MenuManagerV2Service } from '../../../service/menu-manager-v2/menu-manager-v2.service';

@Component({
  selector: 'manage-items-v2',
  templateUrl: './manage-items-v2.component.html',
  styleUrls: ['./manage-items-v2.component.scss']
})
export class ManageItemsV2Component implements OnInit {

  detailsForm: FormGroup;
  quantityForm: FormGroup;
  extrasForm: FormGroup;
  menuItem: any = {};

  constructor(
    private fb: FormBuilder, private menuServicev2: MenuManagerV2Service, public common: CommonService
  ) {

    this.menuItem = this.menuServicev2.itemSelected || {};    

    if (this.menuItem.addons !== undefined) {
      if (this.menuItem.addons.length > 0) {
        let addons = this.menuItem.addons;
        this.menuItem.addons = new Object();
        addons.forEach(addon => {
          this.menuItem.addons[addon.name.toLowerCase()] = addon.choices;
        });
      }
    }

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

  ngOnInit() {
  }

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
          name: [quantity.name, [Validators.required]],
          price: [quantity.price, [Validators.required]],
          isNonVeg: [quantity.isNonVeg]
        }));
      });
    } else {
      this.quantities.push(this.fb.group({
        name: ['', [Validators.required]],
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
          name: [extra.name, [Validators.required]],
          price: [extra.price, [Validators.required]],
          isNonVeg: [extra.isNonVeg]
        }));  
      });
    } else {
      this.extras.push(this.fb.group({
        name: ['', [Validators.required]],
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
      
      let addons = new Array();

      if (this.quantityForm.value.quantities.length > 0) {            
        let choices = []
        this.quantityForm.value.quantities.map(quantity => {
          if (quantity.name !== '' && quantity.price !== null) { 
            choices.push(quantity);
          }
        })
        addons.push({
          name: 'Quantity',
          choices: choices
        })
      }

      if (this.extrasForm.value.extras.length > 0) {
        let choices = []
        this.extrasForm.value.extras.map(quantity => {
          if (quantity.name !== '' && quantity.price !== null) { 
            choices.push(quantity);
          }
        })
        addons.push({
          name: 'Extras',
          choices: choices
        })
      }

      this.menuServicev2.saveItem(this.detailsForm.value, this.menuItem.id, addons)
      .then(response => {
        this.menuServicev2.createItem(response.item);
        this.cancel();
      })
      .catch(err => {
        
      });
  
      // this.menuService.saveItem(this.detailsForm.value, addons, null);
      // this.menuService.isAdding = false;
    }
  }

  resetForms() {
    this.detailsForm.reset();
    this.quantityForm.reset();
    this.extrasForm.reset();
  }

  cancel() {
    this.resetForms();
    this.menuServicev2.showEmpty = true;
    this.menuServicev2.showItem = false;
    this.menuServicev2.showCategory = false;
  }

}
