import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'url';
import { reject } from 'q';

import { ConstantsService } from '../constants/constants.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PartnerService {

  public partnersList: any;
  public partnerData: any;
  public cuisines = ['Afghan','Afghani','African','American','Andhra','Arabian','Armenian','Asian','Assamese','Australian','Awadhi','Bakery','Bangladeshi','BBQ','Belgian','Bengali','Beverages','Bihari','Biryani','Bohri','Brasserie','British','Bubble Tea','Burger','Burmese','Cafe','Charcoal Chicken','Chettinad','Chinese','Continental','Cuisine Varies','Desserts','Drinks Only','Ethiopian','European','Fast Food','Fijian','Filipino','Finger Food','French','German','Goan','Greek','Gujarati','Healthy Food','Hot Pot','Hyderabadi','Ice Cream','Illocano','Indian','Indonesian','Iranian','Irish','Israeli','Italian','Japanese','Juices','Kashmiri','Kebab','Kerala','Konkan','Korean','Lebanese','Lucknowi','Maharashtrian','Malaysian','Malwani','Mangalorean','Martabak','Mediterranean','Mexican','Middle Eastern','Mithai','Modern Australian','Modern Indian','Mongolian','Moroccan','Mughlai','Naga','Native Australian','Nepalese','North Eastern','North Indian','Oriya','Pakistani','Panini','Parsi','Peruvian','Pizza','Poké','Portuguese','Rajasthani','Raw Meats','Roast Chicken','Rolls','Russian','Salad','Sandwich','Seafood','Sindhi','Singaporean','South American','South Indian','Spanish','Sri Lankan','Steak','Street Food','Sushi','Tea','Tex-Mex','Thai','Tibetan','Turkish','Vietnamese','Wrap']

  constructor(private http: HttpClient) { }

  getPartner(partnerID) {

    return new Promise((resolve: (success) => void, reject: (reason: Error) => void) => {
      this.http.get(ConstantsService.partner + '/' + partnerID).subscribe(
        response => {
          resolve(response)
        }, error => {          
          reject(error)
        }
      )
    })

  }

  savePartner(partner) {
    return new Promise((resolve: (success) => void, reject: (reason: Error) => void) => {
      this.http.post(ConstantsService.partner, partner).subscribe(
        response => {
          resolve(response)
        }, error => {
          reject(error)
        }
      )
    })
  }

  updatePartner(partnerID, partner) {
    return new Promise((resolve: (success) => void, reject: (reason: Error) => void) => {
      this.http.post(ConstantsService.partner + '/' + partnerID, partner).subscribe(
        response => {
          resolve(response)
        }, error => {
          reject(error)
        }
      )
    })
  }

  setPartnerStatus(partnerID, status) {
    return new Promise((resolve: (success) => void, reject: (reason: Error) => void) => {
      this.http.post(ConstantsService.partner + '/updateStatus', { partnerID: partnerID, status: status})
      .subscribe(
        response => {
          resolve(response)
        }, error => {
          reject(error)
        }
      )
    })
  }

  deletePartner(partnerID) {}

  getPendingPartners() {}

  getActiePartners() {}

  getAllPartners() {
    return new Promise((resolve: (success) => void, reject: (reason: Error) => void) => {
      this.http.get(ConstantsService.partner).subscribe(
        response => {
          this.partnersCache(response);
          resolve(response)
        }, error => {
          reject(error)
        }
      )
    })
  }

  uploadPartnerLogo(file: File): Observable<Object> {
    const url = `${ConstantsService.partner}/uploadimage`;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(url, formData)
    .map((response) => { 
      const result = {
        url: `${ConstantsService.imageserve}${response["success"]}`,
        imageid: response["success"]
      };
      return result; 
    })
  }

  uploadPartnerBG(file: File): Observable<Object> {
    const url = `${ConstantsService.partner}/uploadbgimage`;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(url, formData)
    .map((response) => { 
      const result = {
        url: `${ConstantsService.imageserveBG}${response["success"]}`,
        imageid: response["success"]
      };
      return result; 
    })
  }

  partnersCache(partners) {
    this.partnersList = partners.data;
  }

}
