import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { ProductModel } from './../models/product.model';
import { Http, Response, ResponseOptions } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { ENV } from '../env.config';
@Injectable()
export class ProductsService {

  private currentUser: any;
  url = "http://localhost:1332/v1/products";

  constructor(private http: Http, private router: Router) { }

  getProductsWithPromise(): Promise<ProductModel[]> {
    return this.http.get(this.url).toPromise()
    .then(this.extractData)
          .catch(this.handleErrorPromise);
}
addProductWithObservable(event: ProductModel): Observable<ProductModel> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, event, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);

  }
  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
  private handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }
}
