import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { CreateProductsComponent } from './create-products/create-products.component';
import { AddComponent } from './add/add.component';

export const ProductsRoutes: Routes = [{
  path: '',
  children: [{
    path: '',
    component: ProductsComponent,
  data: {
    heading: 'Products'
   }
  },
  {
    path: 'add',
    component: CreateProductsComponent,
    data: {
      heading: 'Add Product'
    }
  }]
  
  
  
}];

@NgModule({
  imports: [RouterModule.forChild(ProductsRoutes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
