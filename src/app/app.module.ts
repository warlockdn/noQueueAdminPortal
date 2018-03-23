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
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

import { PartnersComponent } from './pages/partners/partners.component';
import { PartnerListingComponent } from './pages/partners/listing/listing.component';
import { AddPartnerComponent } from './pages/partners/add-partner/add-partner.component';
import { EditPartnerComponent } from './pages/partners/edit-partner/edit-partner.component';
import { ManageMenuComponent, DialogNewCategory, DeleteCategory, NoCategorySelected } from './pages/manage-menu/manage-menu.component';

import { CustomersComponent } from './pages/customers/customers.component';

import { FinancialsComponent } from './pages/financials/financials.component';
import { FinanceAnalyticsComponent } from './pages/financials/finance-analytics/finance-analytics.component';
import { TransactionsComponent, ViewTransaction } from './pages/financials/transactions/transactions.component';
import { ManageCategoryComponent } from './pages/manage-menu/manage-category/manage-category.component';

// 404
import { NotFound404Component } from './pages/not-found-404/not-found-404.component';

import { AuthService } from './service/auth/auth.service';
import { CommonService } from './service/common/common.service';
import { MenuManagerService } from './service/menu-manager/menu-manager.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    NotFound404Component,
    PartnersComponent,
    CustomersComponent,
    FinancialsComponent,
    PartnerListingComponent,
    AddPartnerComponent,
    EditPartnerComponent,
    ManageMenuComponent,
    DialogNewCategory,
    DeleteCategory,
    NoCategorySelected,
    FinanceAnalyticsComponent,
    TransactionsComponent,
    ViewTransaction,
    ManageCategoryComponent,
  ],
  entryComponents: [DialogNewCategory, ViewTransaction, DeleteCategory],
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
    CommonService,
    MenuManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
