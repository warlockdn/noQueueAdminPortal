import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

// Boss
import { AdminDashboardComponent } from './boss/admin-dashboard/admin-dashboard.component';

import { PartnersComponent } from './boss/partners/partners.component';
import { PartnerListingComponent } from './boss/partners/listing/listing.component';
import { AddPartnerComponent } from './boss/partners/add-partner/add-partner.component';
import { EditPartnerComponent } from './boss/partners/edit-partner/edit-partner.component';
import { ManageMenuComponent } from './manage-menu/manage-menu.component';

import { CustomersComponent } from './boss/customers/customers.component';

import { FinancialsComponent } from './boss/financials/financials.component';
import { FinanceAnalyticsComponent } from './boss/financials/finance-analytics/finance-analytics.component';
import { TransactionsComponent } from './boss/financials/transactions/transactions.component';

// Partner
import { PartnerDashboardComponent } from './partner/partner-dashboard/partner-dashboard.component';

import { NotFound404Component } from './not-found-404/not-found-404.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: AdminDashboardComponent },
    { path: 'partner', component: PartnersComponent,
        children: [
            { path: '', redirectTo: 'all', pathMatch: 'full' },
            { path: 'add', component: AddPartnerComponent },
            { path: 'edit', redirectTo: 'all', pathMatch: 'full' },
            { path: 'edit/:partnerid', component: EditPartnerComponent },
            { path: ':type', component: PartnerListingComponent },
        ]            
    },
    { path: 'manage-menu', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'manage-menu/:partnerid', component: ManageMenuComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'finance-core', component: FinancialsComponent,
        children: [
            { path: '', redirectTo: 'analytics', pathMatch: 'full' },
            { path: 'analytics', component: FinanceAnalyticsComponent },
            { path: 'transactions', component: TransactionsComponent },
        ]
    },
    { path: '**', component: NotFound404Component }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }