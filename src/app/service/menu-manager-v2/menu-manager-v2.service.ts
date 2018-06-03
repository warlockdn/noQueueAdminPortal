import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

export interface SubCollection {
  name: string,
  type?: string,
  items?: [{
    id?: number
  }],
  selected?: boolean
}

export interface Collection {
  name: string,
  type?: string,
  items?: [{
    id?: number
  }],
  subcollection?: [SubCollection],
  selected?: boolean
}

export interface Item {
  id?: number,
  partnerID: number,
  name: string,
  price: number,
  isNonVeg: boolean,
  hasAddons: boolean,
  isEnabled: boolean,  
  addons?: any,
  desription?: string,
  status?: boolean
  /* [{
      name: string,
      choices: [{
          name: string,
          isVeg: boolean,
          price: number,
          inStock: boolean
      }]
  }], */
}

import { ConstantsService } from '../constants/constants.service';

@Injectable()
export class MenuManagerV2Service {

  public collections: Array<Collection> = [];
  public collectionSelected = {
    name: null,
    items: []
  };

  public collectionSelectedIndex: number;
  
  public collectionIsChild: boolean;
  public collectionChildIndex: number;

  public items: Array<Item>;
  public itemSelected: Object = {};

  public showEmpty: boolean = true;
  public showItem: boolean = false;
  public showCategory: boolean = false;

  constructor(private http: HttpClient) { }

  getPartnerID() {
    return parseInt(localStorage.getItem('partnerID'));
  }

  setPartnerID(partnerID) {
    localStorage.setItem('partnerID', partnerID)
  }

  fetchItems(partnerID) {
    return new Promise((resolve: (success) => void, reject: (reason: Error) => void) => {
      this.http.get(`${ConstantsService.partner}/${partnerID}/menuv2/items`).subscribe(
        response => {
          resolve(response)
        }, error => {
          reject(error)
        }
      )
    })
  }

  getItems() {
    let items = JSON.parse(localStorage.getItem('items')) || {};
    return items;
  }

  setItems(items) {
    localStorage.setItem('items', items); 
    let newItems = [];
    let obj = JSON.parse(items);
    let arr = Object.keys(obj);
    arr.map((item, index) => {
      newItems.push(obj[item]);
    })
    this.items = newItems;  
  }

  getItem() {}

  /*
    Saves Item to storage
  */
  createItem(item: Item) {
    const id = item.id;
    let items: Object = this.getItems() || new Object({});
    items[id] = item;
    this.setItems(JSON.stringify(items));
  }
  
  saveItem(details, id, addons) {

    const partnerID = this.getPartnerID();

    let item: Item = {
      partnerID: this.getPartnerID(),
      name: details.name,
      price: details.price,
      isNonVeg: details.isNonVeg,
      hasAddons: false,
      isEnabled: true,
      status: false
    }

    if (id !== null) {
      item.id = id;
    }

    let finalAddons = [];

    addons.forEach(addon => {
      if (addon.choices.length > 0) {
        finalAddons.push(addon);
      }
    });

    if (finalAddons.length > 0) {
      item.addons = finalAddons;
      item.hasAddons = true;
    }

    /* if (addons.)  {
      item.hasAddons = true;
    } */

    return new Promise((resolve: (success) => void, reject: (reason: Error) => void) => {
      this.http.post(`${ConstantsService.partner}/${partnerID}/menuv2/items`, 
        {
          item: item
        }).subscribe(
        response => {
          resolve(response);
        }, error => {
          reject(error);
        }
      )
    })
  }

  deleteItem(itemID) {

    const partnerID = this.getPartnerID();

    return new Promise((resolve: (success) => void, reject: (reason: Error) => void) => {
      this.http.delete(`${ConstantsService.partner}/${partnerID}/menuv2/items/delete/${itemID}`).subscribe(
        response => {
          let items = this.getItems();
          delete items[itemID]
          this.setItems(JSON.stringify(items));
          this.items = this.items.filter(obj => obj.id !== itemID);
          resolve(response);
        }, error => {
          reject(error);
        }
      )
    })
  }

  fetchCollections(partnerID) {
    return new Promise((resolve: (success) => void, reject: (reason: Error) => void) => {
      this.http.get(`${ConstantsService.partner}/${partnerID}/menuv2/collections`).subscribe(
        response => {

          // need to process the menu and remove empty
          let menu = response;
          menu["collections"].forEach(collection => {
            if (collection.items.length === 0) {
                delete collection.items;
            }
            if (collection.subcollection.length === 0) {
                delete collection.subcollection;
            }
          });

          resolve(menu)
        }, error => {
          reject(error)
        }
      )
    })
  }
  
  getCollections() {
    return JSON.parse(localStorage.getItem('collections'));
  }

  setCollections(collections) {
    localStorage.setItem('collections', JSON.stringify(collections));
  }

  saveCollections() {

    const partnerID = this.getPartnerID();
    let collections = this.getCollections() || [];

    return new Promise((resolve: (success) => void, reject: (reason: Error) => void) => {
      this.http.post(`${ConstantsService.partner}/${partnerID}/menuv2/items`, 
        {
          collections: collections
        }).subscribe(
        response => {
          resolve(response);
        }, error => {
          reject(error);
        }
      )
    })
  }

  createCollection(collection: Collection) {
    let collections = this.getCollections() || [];
    collections.push(collection);
    this.collections.push(collection);
    this.setCollections(collections);
  }

  editCollection(collection: Collection, index) {
    let collections = this.getCollections();
    collections[index].name = collection.name;
    this.collections[index].name = collection.name;
    this.setCollections(collections);
  }

  updateCollection(collection: Collection, index) {
    let collections = this.getCollections();
    collections[index] = collection;
    this.collections[index] = collection;
    this.setCollections(collections);
  }

  deleteCollection(index) {
    let collections = this.getCollections();
    collections.splice(index, 1);
    this.collections.splice(index, 1);
    this.setCollections(collections);
  }

  createSubCollection(subcollection: SubCollection, parentIndex) {
    let collections = this.getCollections();
    if (typeof collections[parentIndex].subcollection === 'undefined') {
      collections[parentIndex].subcollection = new Array();
    }
    collections[parentIndex].subcollection.push(subcollection);
    this.collections = collections;
    this.setCollections(collections);
  }

  editSubCollection(subcollection: SubCollection, parentIndex, index) {
    let collections = this.getCollections();
    collections[parentIndex].subcollection[index].name = subcollection.name;
    this.collections[parentIndex].subcollection[index].name = subcollection.name;
    this.setCollections(collections);
  }

  updateSubCollection(subcollection: SubCollection, parentIndex, index) {
    let collections = this.getCollections();
    collections[parentIndex].subcollection[index] = subcollection;
    this.collections[parentIndex].subcollection[index] = subcollection;
    this.setCollections(collections);
  }

  deleteSubCollection(parentIndex, index) {
    let collections = this.getCollections();
    collections[parentIndex].subcollection.splice(index, 1);
    this.collections[parentIndex].subcollection.splice(index, 1);
    this.setCollections(collections);
  }

  uploadMenu(type) {
    const partnerID = this.getPartnerID();
    let collections = this.getCollections();
    let newCollection = new Array();

    collections.forEach((collection, index) => {
      if (typeof collection.items !== 'undefined') { // has items and is not a parent
        
        let ids = new Array();
        collection.items.forEach(item => {
          ids.push({
            id: item.id
          });
        });

        newCollection.push({
          name: collection.name,
          items: ids
        });

      } else { // has subcollection and is a parent
        
        if (collection.subcollection) {
          let subcollection = new Array();
          collection.subcollection.forEach((sub, index) => {
  
            let ids = new Array();
  
            sub.items.forEach(item => {
              ids.push({
                id: item.id
              });
            });
  
            subcollection.push({
              name: collection.name,
              items: ids
            })
          });
  
          newCollection.push({
            name: collection.name,
            subcollection: subcollection
          });
        }

      }
    })

    console.log(newCollection);

    return new Promise((resolve: (success) => void, reject: (reason: Error) => void) => {
      this.http.post(`${ConstantsService.partner}/${partnerID}/menu`, 
        { 
          menu: newCollection, 
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

}
