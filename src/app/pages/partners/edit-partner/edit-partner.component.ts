import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { } from '@types/googlemaps';
import { ok } from 'assert';

import { Partner } from './../partner.interface';
import { PartnerService } from '../../../service/partner/partner.service';

@Component({
  selector: 'app-edit-partner',
  templateUrl: './edit-partner.component.html',
  styleUrls: ['./edit-partner.component.scss']
})
export class EditPartnerComponent {

  // editpartnerForm: Partner;

  @ViewChild('partnerForm') partnerForm: NgForm;
  @ViewChild('gmap') gmapElement: any;

  map: google.maps.Map;
  partnerID: String;
  cuisines = ['Afghan','Afghani','African','American','Andhra','Arabian','Armenian','Asian','Assamese','Australian','Awadhi','Bakery','Bangladeshi','BBQ','Belgian','Bengali','Beverages','Bihari','Biryani','Bohri','Brasserie','British','Bubble Tea','Burger','Burmese','Cafe','Charcoal Chicken','Chettinad','Chinese','Continental','Cuisine Varies','Desserts','Drinks Only','Ethiopian','European','Fast Food','Fijian','Filipino','Finger Food','French','German','Goan','Greek','Gujarati','Healthy Food','Hot Pot','Hyderabadi','Ice Cream','Illocano','Indian','Indonesian','Iranian','Irish','Israeli','Italian','Japanese','Juices','Kashmiri','Kebab','Kerala','Konkan','Korean','Lebanese','Lucknowi','Maharashtrian','Malaysian','Malwani','Mangalorean','Martabak','Mediterranean','Mexican','Middle Eastern','Mithai','Modern Australian','Modern Indian','Mongolian','Moroccan','Mughlai','Naga','Native Australian','Nepalese','North Eastern','North Indian','Oriya','Pakistani','Panini','Parsi','Peruvian','Pizza','Poké','Portuguese','Rajasthani','Raw Meats','Roast Chicken','Rolls','Russian','Salad','Sandwich','Seafood','Sindhi','Singaporean','South American','South Indian','Spanish','Sri Lankan','Steak','Street Food','Sushi','Tea','Tex-Mex','Thai','Tibetan','Turkish','Vietnamese','Wrap'];
  constructor(private route: ActivatedRoute, private partner: PartnerService) { }

  ngAfterViewInit() {

    this.partnerID = (this.route.snapshot.params.partnerid).toString();

    let mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.partner.getPartner(this.partnerID).then((success) => {

      this.partner.partnerData = success.data;
      this.loadLocation(this.partner.partnerData.location.coordinates[1], this.partner.partnerData.location.coordinates[0]);

      this.partner.partnerData.location = {
        latitude: this.partner.partnerData.location.coordinates[0],
        longitude: this.partner.partnerData.location.coordinates[1],
      }

      this.partnerForm.form.patchValue(this.partner.partnerData);

    }).catch((err) => {
      console.log(err.error);
    })

  }

  loadLocation(lat, long) {
    this.map.setCenter(new google.maps.LatLng(lat, long));
    this.map.setZoom(15);
    let location = new google.maps.LatLng(lat, long);
    let marker = new google.maps.Marker({
      position: location,
      map: this.map
    });    
  }

  updatePartner(form) {
    this.partner.updatePartner(this.partner.partnerData.partnerID, form.value).then((success) => {      
      console.log('Partner Saved Successfully');
    }).catch((error) => {
      console.log('Error Saving Partner ', error.error.message);
    })   
  }

}
