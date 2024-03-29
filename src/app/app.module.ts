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
  MatSnackBarModule,
  MatFormFieldModule,
  MatTabsModule,
  MatCardModule
 } from '@angular/material';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

import { PartnersComponent } from './pages/partners/partners.component';
import { PartnerListingComponent, PartnerStatus } from './pages/partners/listing/listing.component';
import { AddPartnerComponent } from './pages/partners/add-partner/add-partner.component';
import { EditPartnerComponent, DialogUpdatedPartner, DialogFailPartner } from './pages/partners/edit-partner/edit-partner.component';
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
import { CouponsService } from './service/coupons/coupons.service';

import { ManageMenuV2Component, DialogNewItemV2, DeleteItemV2, DialogNewCategoryV2, DeleteCategoryV2 } from './pages/manage-menu-v2/manage-menu-v2/manage-menu-v2.component';
import { ManageCategoryV2Component } from './pages/manage-menu-v2/manage-category-v2/manage-category-v2.component';
import { ManageItemsV2Component } from './pages/manage-menu-v2/manage-items-v2/manage-items-v2.component';
import { MenuManagerV2Service } from './service/menu-manager-v2/menu-manager-v2.service';
import { ItemSelectionComponent } from './pages/manage-menu-v2/item-selection/item-selection.component';
import { CouponMangerComponent } from './pages/coupon-manger/coupon-manger.component';
import { CouponListComponent, DialogDeleteCoupon } from './pages/coupon-manger/coupon-list/coupon-list.component';
import { CouponDetailComponent } from './pages/coupon-manger/coupon-detail/coupon-detail.component';

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
    PartnerStatus,
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
    ManageMenuItemComponent,
    ManageMenuV2Component,
    ManageCategoryV2Component,
    ManageItemsV2Component,
    DialogNewItemV2, 
    DeleteItemV2,
    DialogNewCategoryV2, 
    DeleteCategoryV2, 
    ItemSelectionComponent,
    DialogUpdatedPartner,
    DialogFailPartner,
    CouponMangerComponent,
    CouponListComponent,
    CouponDetailComponent,
    DialogDeleteCoupon
  ],
  entryComponents: [PartnerStatus, DialogNewCategory, ViewTransaction, DialogNewItemV2, DeleteItemV2, DeleteCategory, DeleteProduct, DialogNewCategoryV2, DeleteCategoryV2, ItemSelectionComponent, DialogUpdatedPartner, DialogFailPartner, DialogDeleteCoupon],
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
    MatSnackBarModule,
    MatFormFieldModule,
    MatTabsModule,
    NgxMatSelectSearchModule,
    MatCardModule
  ],
  providers: [
    ConstantsService,
    AuthService,
    CommonService,
    PartnerService,
    MenuManagerService,
    MenuManagerV2Service,
    CouponsService,
    // { provide: ErrorHandler, useClass: RavenErrorHandler }
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
