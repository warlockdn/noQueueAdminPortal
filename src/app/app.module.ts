import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import {
  MatToolbarModule, 
  MatMenuModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  MatButtonModule, 
  MatSidenavModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule
 } from '@angular/material'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './boss/admin-dashboard/admin-dashboard.component';

import { PartnersComponent } from './boss/partners/partners.component';
import { PartnerListingComponent } from './boss/partners/listing/listing.component';
import { AddPartnerComponent } from './boss/partners/add-partner/add-partner.component';
import { EditPartnerComponent } from './boss/partners/edit-partner/edit-partner.component';
import { ManageMenuComponent, DialogNewCategory } from './manage-menu/manage-menu.component';

import { CustomersComponent } from './boss/customers/customers.component';

import { FinancialsComponent } from './boss/financials/financials.component';
import { FinanceAnalyticsComponent } from './boss/financials/finance-analytics/finance-analytics.component';
import { TransactionsComponent, ViewTransaction } from './boss/financials/transactions/transactions.component';

import { PartnerDashboardComponent } from './partner/partner-dashboard/partner-dashboard.component';
import { PartnerFinancialsComponent } from './partner/partner-financials/partner-financials.component';

// 404
import { NotFound404Component } from './not-found-404/not-found-404.component';

import { AuthService } from './service/auth/auth.service';
import { CommonService } from './service/common/common.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    PartnerDashboardComponent,
    NotFound404Component,
    PartnersComponent,
    CustomersComponent,
    FinancialsComponent,
    PartnerListingComponent,
    AddPartnerComponent,
    EditPartnerComponent,
    ManageMenuComponent,
    DialogNewCategory,
    FinanceAnalyticsComponent,
    TransactionsComponent,
    ViewTransaction,
    PartnerFinancialsComponent
  ],
  entryComponents: [DialogNewCategory, ViewTransaction],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  providers: [
    AuthService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
