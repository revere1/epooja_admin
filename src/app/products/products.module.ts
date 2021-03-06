import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products.component';
import { AddComponent } from './add/add.component';
import { SharedModule } from '../shared/shared.module';
import { CreateProductsComponent } from './create-products/create-products.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { ProductFormService } from '../services/products/product-form.service';
import { ProductsService } from '../services/products.service';
import { ToastModule } from 'ng2-toastr';
@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    DropzoneModule,
    ToastModule.forRoot(),

    
  ],
  declarations: [
    ProductsComponent, 
    AddComponent,
    CreateProductsComponent
  ],
  providers: [
    ProductFormService,
    ProductsService
  ]
})
export class ProductsModule { }
