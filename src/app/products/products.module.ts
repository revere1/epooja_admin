import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products.component';
import { AddComponent } from './add/add.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
    
  ],
  declarations: [ProductsComponent, AddComponent]
})
export class ProductsModule { }
