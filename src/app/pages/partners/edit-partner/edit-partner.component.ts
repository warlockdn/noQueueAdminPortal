import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { } from '@types/googlemaps';
import { ok } from 'assert';

import { Partner } from './../partner.interface';
import { PartnerService } from '../../../service/partner/partner.service';
import { ConstantsService } from '../../../service/constants/constants.service';

@Component({
  selector: 'app-edit-partner',
  templateUrl: './edit-partner.component.html',
  styleUrls: ['./edit-partner.component.scss']
})
export class EditPartnerComponent {

  // editpartnerForm: Partner;

  partnerForm: FormGroup;
  @ViewChild('gmap') gmapElement: any;

  map: google.maps.Map;
  markers: any = [];
  partnerID: String;
  fileToUpload: File = null;
  partnerLogo = null;
  isLoading: Boolean = false;
  cuisines = ['Afghan','Afghani','African','American','Andhra','Arabian','Armenian','Asian','Assamese','Australian','Awadhi','Bakery','Bangladeshi','BBQ','Belgian','Bengali','Beverages','Bihari','Biryani','Bohri','Brasserie','British','Bubble Tea','Burger','Burmese','Cafe','Charcoal Chicken','Chettinad','Chinese','Continental','Cuisine Varies','Desserts','Drinks Only','Ethiopian','European','Fast Food','Fijian','Filipino','Finger Food','French','German','Goan','Greek','Gujarati','Healthy Food','Hot Pot','Hyderabadi','Ice Cream','Illocano','Indian','Indonesian','Iranian','Irish','Israeli','Italian','Japanese','Juices','Kashmiri','Kebab','Kerala','Konkan','Korean','Lebanese','Lucknowi','Maharashtrian','Malaysian','Malwani','Mangalorean','Martabak','Mediterranean','Mexican','Middle Eastern','Mithai','Modern Australian','Modern Indian','Mongolian','Moroccan','Mughlai','Naga','Native Australian','Nepalese','North Eastern','North Indian','Oriya','Pakistani','Panini','Parsi','Peruvian','Pizza','Poké','Portuguese','Rajasthani','Raw Meats','Roast Chicken','Rolls','Russian','Salad','Sandwich','Seafood','Sindhi','Singaporean','South American','South Indian','Spanish','Sri Lankan','Steak','Street Food','Sushi','Tea','Tex-Mex','Thai','Tibetan','Turkish','Vietnamese','Wrap'];

  constructor(private route: ActivatedRoute, private partner: PartnerService, private fb: FormBuilder, private router: Router) { 
    this.createPartnerForm();
  }

  ngAfterViewInit() {

    this.partnerID = (this.route.snapshot.params.partnerid).toString();
    let mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    
    this.partner.getPartner(this.partnerID).then((success) => {

      console.log(success.data);
      this.partner.partnerData = success.data;
      this.loadLocation(this.partner.partnerData.location.coordinates[1], this.partner.partnerData.location.coordinates[0]);

      this.partner.partnerData.location = {
        latitude: this.partner.partnerData.location.coordinates[0],
        longitude: this.partner.partnerData.location.coordinates[1],
      }

      this.partnerForm.patchValue(this.partner.partnerData);
      if (this.partnerForm.controls.imageid.value !== '') {
        this.partnerLogo = `${ConstantsService.imageserve}${this.partnerForm.controls.imageid.value}`;
      }

    }).catch((err) => {
      console.log(err.error);
    })


  }

  createPartnerForm() {
    this.partnerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      alternate: new FormControl(''),
      imageid: new FormControl(''),
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
      })
    })
  }

  loadLocation(lat, long) {
    this.map.setCenter(new google.maps.LatLng(lat, long));
    this.map.setZoom(15);
    let location = new google.maps.LatLng(lat, long);

    if (this.markers.length > 0) {
      for(let i = 0; i < this.markers.length; i++){
        this.markers[i].setMap(null);
      }
    }

    let marker = new google.maps.Marker({
      position: location,
      map: this.map
    });

    this.markers.push(marker);
  }

  updatePartner(form) {
    this.partner.updatePartner(this.partner.partnerData.partnerID, form).then((success) => {
      console.log('Partner Saved Successfully');
    }).catch((error) => {
      console.log('Error Saving Partner ', error.error.message);
    })   
  }

  handleUpload(files: FileList, event) {
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
        console.log(error);
      })
    }
  }

  cancel() {
    this.partnerForm.reset();
    this.router.navigate(['partner', 'all']);
  }

}
