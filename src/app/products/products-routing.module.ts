import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
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
    component: AddComponent,
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
