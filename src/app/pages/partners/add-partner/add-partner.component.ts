import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { } from '@types/googlemaps';
import { ok } from 'assert';

import { Partner } from '../partner.interface';
import { PartnerService } from '../../../service/partner/partner.service';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.scss']
})
export class AddPartnerComponent {

  partnerForm: FormGroup;
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  fileToUpload: File = null;
  partnerLogo = null;
  partnerBG = null;
  isLoading: Boolean = false;
  isLoadingBG: Boolean = false;
  actionButtons: boolean = true;
  isAdding: boolean = true;
  cuisines: any;
  weekdays: Array<String> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  response: Object = { username: '', password: '', name: '' };

  constructor(private partner: PartnerService, private fb: FormBuilder, private router: Router) { 
    this.actionButtons = true;
    this.cuisines = partner.cuisines;
    this.createPartnerForm();
  }

  ngAfterViewInit() {
    let mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  createPartnerForm() {
    this.partnerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      alternate: new FormControl(''),
      imageid: new FormControl(''),
      partnerbg: new FormControl(''),
      location: this.fb.group({
        latitude: new FormControl('', Validators.required),
        longitude: new FormControl('', Validators.required)
      }),
      basic: this.fb.group({
        address: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        pincode: new FormControl('', Validators.required)
      }),
      characteristics: this.fb.group({
        type: new FormControl('', Validators.required),
        services: new FormControl('', Validators.required),
        seating: new FormControl('', Validators.required),
        cuisine: new FormControl('', Validators.required),
        weektiming: new FormControl('', Validators.required),
        opentime: new FormControl('', Validators.required),
        closetime: new FormControl('', Validators.required)
      }),
      commission: new FormControl(null, Validators.required),
      bankDetails: this.fb.group({
        accname: new FormControl('', Validators.required),
        number: new FormControl('', Validators.required),
        bankname: new FormControl('', Validators.required),
        branch: new FormControl('', Validators.required),
        ifsc: new FormControl('', Validators.required),
      }),
      taxInfo: this.fb.group({
        cgst: new FormControl(2.5),
        sgst: new FormControl(2.5),
        servicetax: new FormControl(),
      })
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

    const latitude: number = lat;
    const longitude: number = long;

    const geocoder = new google.maps.Geocoder;
    geocoder.geocode({ 'location': {'lat': latitude, 'lng': longitude} }, (results, status) => {
      if (status.toString() == "OK") {
        this.extractAddress(results)
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    })
  }

  extractAddress(results) {

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

    this.partnerForm.patchValue({
      basic: {
        city: storableLocation.city,
        state: storableLocation.state,
        pincode: storableLocation.pincode
      }
    })

  }

  addPartner(form) {
    this.partner.savePartner(form).then((success) => {
      
      console.log('Partner Saved Successfully');
      
      this.response = {
        password: success.password,
        username: success.partnerID,
        name: form.name
      }
      this.isAdding = false;

    }).catch((error) => {
      console.log('Error Saving Partner ', error);
    })   
  }

  selectAll() {
    // this.partnerForm.controls.weektiming.up
  }

  addNew() {
    this.partnerForm.reset();
    this.partnerForm.markAsUntouched();
    this.isAdding = true;
  }

  manageMenu() {
    this.router.navigate(['manage-menu', this.response["username"]]);
  }

  cancel() {
    this.partnerForm.reset();
    this.router.navigate(['partner', 'all']);
  }

  handleUpload(files: FileList, event, type) {
    
    if (type === "logo") {

      this.fileToUpload = files.item(0);
      if (this.fileToUpload) {
        this.isLoading = true;
        console.log(this.fileToUpload);
        this.partner.uploadPartnerLogo(this.fileToUpload).subscribe(data => {
          this.partnerLogo = data["url"];
          // Patch value to imageid in Form.
          this.partnerForm.patchValue({
            imageid: data["imageid"]
          });
          event.target.value = '';
          this.isLoading = false;
        }, error => {
          this.isLoading = false;
          console.log(error);
        })
      }

    } else {

      this.fileToUpload = files.item(0);
      if (this.fileToUpload) {
        this.isLoadingBG = true;
        console.log(this.fileToUpload);
        this.partner.uploadPartnerBG(this.fileToUpload).subscribe(data => {
          this.partnerBG = data["url"];
          // Patch value to imageid in Form.
          this.partnerForm.patchValue({
            partnerbg: data["imageid"]
          });
          event.target.value = '';
          this.isLoadingBG = false;
        }, error => {
          this.isLoadingBG = false;
          console.log(error);
        })
      }

    }
  }

}
