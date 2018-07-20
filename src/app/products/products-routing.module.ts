import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';

export const ProductsRoutes: Routes = [{
  path: '',
  component: ProductsComponent,
  data: {
    heading: 'Products'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(ProductsRoutes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
