import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { CreateProductsComponent } from './create-products/create-products.component';

export const ProductsRoutes: Routes = [{
  path: '',
  component: ProductsComponent,
  data: {
    heading: 'Products'
  }
},
{
  path: 'create', component: CreateProductsComponent,
  data: {
    breadcrumb: 'Create'
  }
},

];

@NgModule({
  imports: [RouterModule.forChild(ProductsRoutes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
