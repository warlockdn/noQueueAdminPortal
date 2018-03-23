import { Injectable } from '@angular/core';

@Injectable()
export class MenuManagerService {

  constructor() { }

  // mock data for dummy menu
  getMenu() {
    const categories = [
      {
        name: 'Veg Indian Starters',
        type: 'veg',
        typeID: 1,
        items: [
          {
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
          }
        ]
      }, {
        name: 'Non-Veg Indian Starters',
        type: 'nonveg',
        typeID: 2,
        items: [
          {
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
            addons: [
              {
                name: 'Quantity',
                type: 'quantity',
                max: -1, 
                min: 1,
                isMandatory: true,
                choices: [
                  {
                    name: 'Half',
                    isNonVeg: true,
                    price: 280,
                  }, {
                    name: 'Full',
                    isNonVeg: true,
                    price: 480,
                  }
                ]
              }
            ]
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
            addons: [
              {
                name: 'Quantity',
                type: 'quantity',
                max: -1, 
                min: 1,
                isMandatory: true,
                choices: [
                  {
                    name: 'Half',
                    isNonVeg: true,
                    price: 280,
                  }, {
                    name: 'Full',
                    isNonVeg: true,
                    price: 480,
                  }
                ]
              }
            ]
          }
        ]
      }, {
        name: 'Veg Pizza',
        type: 'veg',
        typeID: 1,
        items: [
          {
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
            addons: [
              {
                name: 'Quantity',
                type: 'quantity',
                max: -1, 
                min: 1,
                isMandatory: true,
                choices: [
                  {
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
                  }
                ]
              }, {
                name: 'Crust',
                type: 'custom',
                max: -1, 
                min: 1,
                isMandatory: true,
                choices: [
                  {
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
                  }
                ]
              }, {
                name: 'Extra Toppings',
                type: 'custom',
                max: 15, 
                min: 0,
                isMandatory: false,
                choices: [
                  {
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
                  }
                ]
              }
            ]
          }
        ]
      }, {
        name: 'Non-Veg Pizza',
        type: 'nonveg',
        typeID: 2,
        items: [
          {
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
            addons: [
              {
                name: 'Quantity',
                type: 'quantity',
                max: -1, 
                min: 1,
                isMandatory: true,
                choices: [
                  {
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
                  }
                ]
              }, {
                name: 'Crust',
                type: 'custom',
                max: -1, 
                min: 1,
                isMandatory: true,
                choices: [
                  {
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
                  }
                ]
              }, {
                name: 'Extra Toppings',
                type: 'custom',
                max: 15, 
                min: 0,
                isMandatory: false,
                choices: [
                  {
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
                  }
                ]
              }
            ]
          }
        ]
      }
    ]

    return categories;
  }
  

}
