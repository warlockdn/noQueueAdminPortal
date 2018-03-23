import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.scss']
})
export class AddPartnerComponent implements OnInit {

  actionButtons: boolean = true;
  isAdding: boolean = true;
  cuisines = ['Afghan','Afghani','African','American','Andhra','Arabian','Armenian','Asian','Assamese','Australian','Awadhi','Bakery','Bangladeshi','BBQ','Belgian','Bengali','Beverages','Bihari','Biryani','Bohri','Brasserie','British','Bubble Tea','Burger','Burmese','Cafe','Charcoal Chicken','Chettinad','Chinese','Continental','Cuisine Varies','Desserts','Drinks Only','Ethiopian','European','Fast Food','Fijian','Filipino','Finger Food','French','German','Goan','Greek','Gujarati','Healthy Food','Hot Pot','Hyderabadi','Ice Cream','Illocano','Indian','Indonesian','Iranian','Irish','Israeli','Italian','Japanese','Juices','Kashmiri','Kebab','Kerala','Konkan','Korean','Lebanese','Lucknowi','Maharashtrian','Malaysian','Malwani','Mangalorean','Martabak','Mediterranean','Mexican','Middle Eastern','Mithai','Modern Australian','Modern Indian','Mongolian','Moroccan','Mughlai','Naga','Native Australian','Nepalese','North Eastern','North Indian','Oriya','Pakistani','Panini','Parsi','Peruvian','Pizza','Poké','Portuguese','Rajasthani','Raw Meats','Roast Chicken','Rolls','Russian','Salad','Sandwich','Seafood','Sindhi','Singaporean','South American','South Indian','Spanish','Sri Lankan','Steak','Street Food','Sushi','Tea','Tex-Mex','Thai','Tibetan','Turkish','Vietnamese','Wrap'];
  res = { name: 'Demo', username: '', password: '' };
  constructor() { 
    this.actionButtons = true;
  }

  ngOnInit() {
  }

  save() {
    setTimeout(() => {
      this.isAdding = false;
      this.actionButtons = false;
      this.res = {
        name: 'Dominos',
        username: '1200256689',
        password: 'testing'
      };
    }, 1000);
  }

}
