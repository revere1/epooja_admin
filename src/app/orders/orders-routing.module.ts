import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';

export const OrdersRoutes: Routes = [{
  path: '',
  component: OrdersComponent,
  data: {
    heading: 'Orders'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(OrdersRoutes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
