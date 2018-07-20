import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
  {path: '', redirectTo: '/authentication/signin', pathMatch: 'full'},
  {
  path: '',
  component: AdminLayoutComponent,
  children: [
    {
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'categories',
    loadChildren: './categories/categories.module#CategoriesModule'
  },
  {
    path: 'products',
    loadChildren: './products/products.module#ProductsModule'
  },
  {
    path: 'orders',
    loadChildren: './orders/orders.module#OrdersModule'
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule'
  }
 ]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [
    {
    path: 'authentication',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  }, {
    path: 'error',
    loadChildren: './error/error.module#ErrorModule'
  }]
}, {
  path: '**',
  redirectTo: 'error/404'
}];

