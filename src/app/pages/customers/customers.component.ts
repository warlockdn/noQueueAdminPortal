import { Component, OnInit } from '@angular/core';

import { CommonService } from './../../service/common/common.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor(public common: CommonService) {
  }

  ngOnInit() {
  }

}
