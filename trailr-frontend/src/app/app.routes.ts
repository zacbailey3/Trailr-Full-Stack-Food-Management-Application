import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MenuListComponent } from './pages/menu-list/menu-list.component';
import { ReportsComponent } from './pages/reports/reports.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'menu',
    component: MenuListComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  }
];
