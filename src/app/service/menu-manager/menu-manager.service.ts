import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { ConstantsService } from '../constants/constants.service';

export interface Category {
  name ? : string,
  type ? : string,
  typeID ? : number,
  items ? : Array<Items>
}

export interface Items {
  name: string,
  price: number,
  isEnabled: boolean,
  isNonVeg: boolean,
  items: [Object]
}

@Injectable()
export class MenuManagerService {

  public menu;
  public categories; 
  public items;
  public categorySelected: Category;

  // Item and Index are helpers for the category selected.
  // Holds the value of the Category that is selected.
  public itemSelected: Object = {};
  public itemSelectedIndex: number;
  
  // If the Category loaded is a Child Category;
  public isChild: Boolean = false;
  
  public isAdding: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  // mock data for dummy menu
  /* getMenu() {
    let categories = [{
      name: 'Veg Indian Starters',
      type: 'veg',
      typeID: 1,
      items: [{
        name: 'Veg Platter',
        price: 410,
        isNonVeg: false,
        description: 'Combo of paneer tikka+seekh kebab+tandoori aloo+tandoori mushroom',
        thumbnail: {
          avatar: '',
          small: '',
          medium: '',
          large: ''
        },
        isEnabled: true,
        hasAddons: false,
        addons: []
      }, {
        name: 'Soya Chap',
        price: 140,
        isNonVeg: false,
        description: '',
        thumbnail: {
          avatar: '',
          small: '',
          medium: '',
          large: ''
        },
        isEnabled: true,
        hasAddons: false,
        addons: []
      }, {
        name: 'Hara Bhara Kabab',
        price: 210,
        isNonVeg: false,
        description: '',
        thumbnail: {
          avatar: '',
          small: '',
          medium: '',
          large: ''
        },
        isEnabled: true,
        hasAddons: false,
        addons: []
      }, {
        name: 'Tandoori Aloo',
        price: 210,
        isNonVeg: false,
        description: '',
        thumbnail: {
          avatar: '',
          small: '',
          medium: '',
          large: ''
        },
        isEnabled: true,
        hasAddons: false,
        addons: []
      }]
    }, {
      name: 'Non-Veg Indian Starters',
      type: 'nonveg',
      typeID: 2,
      items: [{
        name: 'Non Veg Tandoori Platter',
        price: 590,
        isNonVeg: true,
        description: 'Combo of kali mirch tikka+malai tikka+mutton seekh+chicken tikka',
        thumbnail: {
          avatar: '',
          small: '',
          medium: '',
          large: ''
        },
        isEnabled: true,
        hasAddons: false,
        addons: []
      }, {
        name: 'Malai Tikka',
        price: 320,
        isNonVeg: true,
        description: '',
        thumbnail: {
          avatar: '',
          small: '',
          medium: '',
          large: ''
        },
        isEnabled: true,
        hasAddons: false,
        addons: []
      }, {
        name: 'Afghani Chicken',
        price: 280,
        isNonVeg: true,
        description: '',
        thumbnail: {
          avatar: '',
          small: '',
          medium: '',
          large: ''
        },
        isEnabled: true,
        hasAddons: true,
        addons: [{
          name: 'Quantity',
          type: 'quantity',
          max: -1,
          min: 1,
          isMandatory: true,
          choices: [{
            name: 'Half',
            isNonVeg: true,
            price: 280,
          }, {
            name: 'Full',
            isNonVeg: true,
            price: 480,
          }]
        }]
      }, {
        name: 'Afghani Chicken',
        price: 280,
        isNonVeg: true,
        description: '',
        thumbnail: {
          avatar: '',
          small: '',
          medium: '',
          large: ''
        },
        isEnabled: true,
        hasAddons: true,
        addons: [{
          name: 'Quantity',
          type: 'quantity',
          max: -1,
          min: 1,
          isMandatory: true,
          choices: [{
            name: 'Half',
            isNonVeg: true,
            price: 280,
          }, {
            name: 'Full',
            isNonVeg: true,
            price: 480,
          }]
        }]
      }]
    }, {
      name: 'Veg Pizza',
      type: 'veg',
      typeID: 1,
      items: [{
        name: 'Margherita',
        price: 99,
        isNonVeg: true,
        description: 'Cheesy Classic',
        thumbnail: {
          avatar: '',
          small: '',
          medium: '',
          large: ''
        },
        isEnabled: true,
        hasAddons: true,
        addons: [{
          name: 'Quantity',
          type: 'quantity',
          max: -1,
          min: 1,
          isMandatory: true,
          choices: [{
            name: 'Medium (serves 2)',
            isNonVeg: false,
            price: 96,
          }, {
            name: 'Large (serves 4)',
            isNonVeg: false,
            price: 296,
          }, {
            name: 'Regular (serves 1)',
            isNonVeg: false,
            price: -1,
          }]
        }, {
          name: 'Crust',
          type: 'custom',
          max: -1,
          min: 1,
          isMandatory: true,
          choices: [{
            name: 'New Hand Tossed',
            isNonVeg: false,
            price: 0,
          }, {
            name: 'Wheat Thin Crust',
            isNonVeg: false,
            price: 0,
          }, {
            name: 'Cheese Burst',
            isNonVeg: false,
            price: 99,
          }, {
            name: 'Fresh Pan Pizza',
            isNonVeg: false,
            price: 0,
          }]
        }, {
          name: 'Extra Toppings',
          type: 'custom',
          max: 15,
          min: 0,
          isMandatory: false,
          choices: [{
            name: 'Extra Cheese',
            isNonVeg: false,
            price: 65,
          }, {
            name: 'Black Olive',
            isNonVeg: false,
            price: 50,
          }, {
            name: 'Paneer',
            isNonVeg: false,
            price: 50,
          }, {
            name: 'Onion',
            isNonVeg: false,
            price: 50,
          }]
        }]
      }]
    }, {
      name: 'Non-Veg Pizza',
      type: 'nonveg',
      typeID: 2,
      items: [{
        name: 'Pepper Barbecue Chicken',
        price: 205,
        isNonVeg: true,
        description: 'Pepper Barbecue Chicken & Onion  ',
        thumbnail: {
          avatar: '',
          small: '',
          medium: '',
          large: ''
        },
        isEnabled: true,
        hasAddons: true,
        addons: [{
          name: 'Quantity',
          type: 'quantity',
          max: -1,
          min: 1,
          isMandatory: true,
          choices: [{
            name: 'Medium (serves 2)',
            isNonVeg: false,
            price: 305,
          }, {
            name: 'Large (serves 4)',
            isNonVeg: false,
            price: 495,
          }, {
            name: 'Regular (serves 1)',
            isNonVeg: false,
            price: -1,
          }]
        }, {
          name: 'Crust',
          type: 'custom',
          max: -1,
          min: 1,
          isMandatory: true,
          choices: [{
            name: 'New Hand Tossed',
            isNonVeg: true,
            price: 0,
          }, {
            name: 'Ch',
            isNonVeg: false,
            price: 0,
          }, {
            name: 'Cheese Burst',
            isNonVeg: false,
            price: 99,
          }, {
            name: 'Fresh Pan Pizza',
            isNonVeg: false,
            price: 0,
          }]
        }, {
          name: 'Extra Toppings',
          type: 'custom',
          max: 15,
          min: 0,
          isMandatory: false,
          choices: [{
            name: 'Extra Cheese',
            isNonVeg: false,
            price: 65,
          }, {
            name: 'Black Olive',
            isNonVeg: false,
            price: 50,
          }, {
            name: 'Paneer',
            isNonVeg: false,
            price: 50,
          }, {
            name: 'Onion',
            isNonVeg: false,
            price: 50,
          }]
        }]
      }]
    }]

    return categories;
  } */


  fetchMenu(partnerID) {
    return new Promise((resolve: (success) => void, reject: (reason: Error) => void) => {
      this.http.get(`${ConstantsService.partner}/${partnerID}/menu`).subscribe(
        response => {
          resolve(response)
        }, error => {
          reject(error)
        }
      )
    })
  }

  /**
    * Save to Server
    *  @param: Type (Draft || Publish)
    * 
    */
  uploadMenu(partnerID, type) {
    return new Promise((resolve: (success) => void, reject: (reason: Error) => void) => {
      this.http.post(`${ConstantsService.partner}/${partnerID}/menu`, 
        { 
          menu: this.getMenu(), 
          type: type
        }).subscribe(
        response => {
          resolve(response)
        }, error => {
          reject(error)
        }
      )
    })
  }

  saveMenu(menu) {
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  getMenu() {
    return JSON.parse(localStorage.getItem('menu'));
  }

  loadCategory(item: Category, isChild: Boolean) {
    this.categorySelected = item;
    this.isChild = isChild;
  }

  getItem() {}

  createCategory(category) {
    category.items = [];
    this.menu.push(category);
    this.saveMenu(this.menu);
  }

  createSubCategory(category, index) {
    this.menu[index]["items"].push(category);
    this.saveMenu(this.menu);
  }

  editCategory(index, name) {
    let menu = this.getMenu();
    menu[index].name = name;
    this.saveMenu(menu);
    this.menu = menu;
  }

  editSubCategory(index, subIndex, name) {
    let menu = this.getMenu();
    menu[index].items[subIndex].name = name;
    this.saveMenu(menu);
    this.menu = menu;
  }

  deleteCategory(index) {
    let menu = this.getMenu();
    menu.splice(index, 1);
    this.saveMenu(menu);
    this.menu = menu;
  }

  deleteSubCategory(index, subIndex) {
    let menu = this.getMenu();
    menu[index]["items"].splice(subIndex, 1);
    this.saveMenu(menu);
    this.menu = menu;
  }

  saveItem(details, addons, customization) {

    let data = details;
    data.isEnabled = true;

    if (addons) { 
      data.hasAddons = true 
      data.addons = addons
    } else { 
      data.hasAddons = false;
    }

    let menu = this.getMenu();

    if (!this.isChild) { // Traverse on Items with direct parent.
      menu.map((category: Category) => {
        if (category.name === this.categorySelected.name) {
          category.items = category.items || [];

          // Update the selectedIndex data with the category Items.
          if (category.items.length > 0 && this.itemSelectedIndex !== null) {
            category.items[this.itemSelectedIndex] = data;
            this.categorySelected.items[this.itemSelectedIndex] = data;
          } else {
            // New entry so push.
            let items = category.items || [];
            items.push(data);
            this.categorySelected.items = this.categorySelected.items || [];
            this.categorySelected.items.push(data);  
          }
        }
      })

      this.menu = menu;
      this.saveMenu(menu);

    } else { // Traverse on Items which is a child
      menu.map((category: Category) => {
        category.items.map((category) => {
          if (category.name === this.categorySelected.name) {

            let items = category.items || [];
            // Not using !== 0 coz showing error. Temp using > 0
            if (items.length > 0 && this.itemSelectedIndex !== null) {
              category.items[this.itemSelectedIndex] = data;
              this.categorySelected.items[this.itemSelectedIndex] = data;
            } else {
              // New entry so push.
              let items:Array<Object> = category.items || [];
              items.push(data);
              this.categorySelected.items = this.categorySelected.items || [];
              this.categorySelected.items.push(data);  
            }
          }
        })
      })

      this.saveMenu(this.menu);

    }
    
    
  }

  loadItem(item, index, state) {
    if (state === 'new') {
      this.itemSelected = {};
      this.itemSelectedIndex = null;
    } else {
      this.itemSelected = item;
      this.itemSelectedIndex = index;
    }
  }

  deleteItem(index) {
    this.categorySelected.items.splice(index, 1);

    let menu = this.getMenu();

    menu.map((category) => {
      if (category.name === this.categorySelected.name) {
        category.items.splice(index, 1);
        return;
      }
    })

    this.saveMenu(menu);
  }

  copyItem(item) {
    this.categorySelected.items.push(item);
    let menu = this.getMenu();

    if (!this.isChild) { // Copying a Item on a Direct Category
      menu.map((category) => {
        if (category.name === this.categorySelected.name) {
          category.items.push(item);
          return;
        }
      });
    } else { // Copying a Item on a Sub Category
      menu.map((category) => {
        category.items.map((category) => {
          if (category.name === this.categorySelected.name) {
            category.items.push(item);
            return;
          }
        })
      })
    }

    console.log('Saving Menu');
    this.saveMenu(menu);
  }

}
