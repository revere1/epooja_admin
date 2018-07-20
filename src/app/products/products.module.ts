import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products.component';
import { CreateProductsComponent } from './create-products/create-products.component';
import { ScriptService } from '../services/script.service';
//import { SectorsService } from '../services/sectors.service';
import { ProductFormService } from '../services/products/product-form.service';
import { ProductsService } from '../services/products.service';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DropzoneModule,
  ],
  declarations: [ProductsComponent, CreateProductsComponent],
  providers: [
    ScriptService,
    ProductsService,
    ProductFormService,
 
    
  ]
})
export class ProductsModule { }
