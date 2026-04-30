import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MenuListComponent } from './pages/menu-list/menu-list.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { LoginComponent } from './pages/login/login.component';

import { authGuard } from './guard/auth.guard';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  {
    path: 'menu',
    component: MenuListComponent,
    canActivate: [authGuard]
  },

  {
    path: 'inventory',
    component: InventoryComponent,
    canActivate: [authGuard]
  },

  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [authGuard]
  }

];
