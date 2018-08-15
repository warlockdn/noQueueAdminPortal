import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { CommonService } from '../../../service/common/common.service';

@Component({
  selector: 'app-finance-analytics',
  templateUrl: './finance-analytics.component.html',
  styleUrls: ['./finance-analytics.component.scss']
})
export class FinanceAnalyticsComponent implements OnInit {

  constructor(private common: CommonService) {
    this.common.title = 'Analysis';
  }

  ngOnInit() {
  }

}





