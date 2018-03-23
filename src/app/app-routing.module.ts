import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';

// Boss
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

import { PartnersComponent } from './pages/partners/partners.component';
import { PartnerListingComponent } from './pages/partners/listing/listing.component';
import { AddPartnerComponent } from './pages/partners/add-partner/add-partner.component';
import { EditPartnerComponent } from './pages/partners/edit-partner/edit-partner.component';
import { ManageMenuComponent } from './pages/manage-menu/manage-menu.component';

import { CustomersComponent } from './pages/customers/customers.component';

import { FinancialsComponent } from './pages/financials/financials.component';
import { FinanceAnalyticsComponent } from './pages/financials/finance-analytics/finance-analytics.component';
import { TransactionsComponent } from './pages/financials/transactions/transactions.component';

import { NotFound404Component } from './pages/not-found-404/not-found-404.component';

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