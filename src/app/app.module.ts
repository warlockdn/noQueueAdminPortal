import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Sentry Error Reporting
import * as Raven from 'raven-js';

Raven
  .config('https://d6bc57eccd2f497fb28578476ee8493b@sentry.io/592969')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    Raven.captureException(err);
  }
}

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
  MatDialogModule,
  MatSlideToggleModule,
  MatSnackBarModule
 } from '@angular/material';
import { AmazingTimePickerModule } from 'amazing-time-picker';
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
import { ManageCategoryComponent, DeleteProduct } from './pages/manage-menu/manage-category/manage-category.component';
import { ManageMenuItemComponent } from './pages/manage-menu/manage-item/manage-item.component';

// 404
import { NotFound404Component } from './pages/not-found-404/not-found-404.component';

import { ConstantsService } from './service/constants/constants.service';
import { InterceptorService } from './service/interceptor/interceptor.service';
import { AuthService } from './service/auth/auth.service';
import { CommonService } from './service/common/common.service';
import { PartnerService } from './service/partner/partner.service';
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
    DeleteProduct,
    ManageMenuItemComponent
  ],
  entryComponents: [DialogNewCategory, ViewTransaction, DeleteCategory, DeleteProduct],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatDialogModule,
    MatSlideToggleModule,
    AmazingTimePickerModule,
    MatSnackBarModule
  ],
  providers: [
    ConstantsService,
    AuthService,
    CommonService,
    PartnerService,
    MenuManagerService,
    // { provide: ErrorHandler, useClass: RavenErrorHandler }
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
