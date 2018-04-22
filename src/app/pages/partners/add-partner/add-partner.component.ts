import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Partner } from '../partner.interface';
import { } from '@types/googlemaps';
import { ok } from 'assert';
import { PartnerService } from '../../../service/partner/partner.service';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.scss']
})
export class AddPartnerComponent {

  @ViewChild('partnerForm') partnerForm: NgForm;
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  actionButtons: boolean = true;
  isAdding: boolean = true;
  cuisines: any;
  response = { name: 'Demo', username: '', password: '' };

  constructor(private partner: PartnerService) { 
    this.actionButtons = true;
    this.cuisines = partner.cuisines;
  }

  ngAfterViewInit() {
    let mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  loadLocation(form, lat, long) {
    this.map.setCenter(new google.maps.LatLng(lat, long));
    this.map.setZoom(15);
    let location = new google.maps.LatLng(lat, long);
    let marker = new google.maps.Marker({
      position: location,
      map: this.map
    });

    const latitude: number = lat;
    const longitude: number = long;

    const geocoder = new google.maps.Geocoder;
    geocoder.geocode({ 'location': {'lat': latitude, 'lng': longitude} }, (results, status) => {
      if (status.toString() == "OK") {
        this.extractAddress(form, results)
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    })
  }

  extractAddress(form, results) {

    let storableLocation = {
      city: null,
      state: null,
      country: null,
      registered_country_iso_code: null,
      pincode: null
    };

    for (let ac = 0; ac < results[0].address_components.length; ac++) {

      let component = results[0].address_components[ac];

      if (component.types.includes('sublocality') || component.types.includes('locality')) {
        storableLocation.city = component.long_name;
      } else if (component.types.includes('administrative_area_level_1')) {
        storableLocation.state = component.short_name;
      } else if (component.types.includes('country')) {
        storableLocation.country = component.long_name;
        storableLocation.registered_country_iso_code = component.short_name;
      } else if (component.types.includes('postal_code')) {
        storableLocation.pincode = parseInt(component.short_name);
      }

    };

    // form.value.basic.city = storableLocation.city;
    // form.value.basic.state = storableLocation.state;
    // form.value.basic.pincode = storableLocation.pincode;

    this.partnerForm.form.patchValue({
      basic: {
        city: storableLocation.city,
        state: storableLocation.state,
        pincode: storableLocation.pincode
      }
    })

  }

  submitPartner(form) {
    this.partner.savePartner(form.value).then((success) => {
      
      console.log('Partner Saved Successfully');
      
      this.response = {
        password: success.password,
        username: success.partnerID,
        name: form.value.name
      }
      this.isAdding = false;

    }).catch((error) => {
      console.log('Error Saving Partner ', error);
    })   
  }

}
