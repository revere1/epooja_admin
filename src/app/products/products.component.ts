import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ProductModel } from '../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  rows = [];
  books: ProductModel[];
  errorMessage: String;
  constructor(
    private _productsService: ProductsService,
  ) { }

  ngOnInit() {
    this.fetchBooks();
    console.log(this.fetchBooks())
  }
  fetchBooks(): void {
    this._productsService.getProductsWithPromise()
      .then( productss => this.books = productss,
             error =>  this.errorMessage = <any>error);   
}
}
