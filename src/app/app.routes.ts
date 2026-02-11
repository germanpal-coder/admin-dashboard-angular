import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { HospitalDashboardComponent } from './pages/hospital-dashboard/hospital-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'hospital',
        component: HospitalDashboardComponent
      },
      {
        path: 'products',
        component: ProductListComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

