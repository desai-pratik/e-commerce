import { product } from './../data-type';
import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {  

  constructor(private http: HttpClient) {}

  addProduct(data: product): Observable<any> {
    return this.http.post(`http://localhost:3000/product`, data, {
      observe: 'response',
    });
  }
  getProducts(): Observable<any> {
    return this.http.get<product[]>(`http://localhost:3000/product`);
  }
  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/product/${id}`);
  }
  getProduct(id: string): Observable<any> {
    return this.http.get<product>(`http://localhost:3000/product/${id}`);
  }
  updateProduct(id: any, data: product): Observable<any> {
    return this.http.put(`http://localhost:3000/product/${id}`, data);
  }
  popularProduct() {
    return this.http.get<product[]>(`http://localhost:3000/product?_limit=4`);
  }

  addCart(cartData: product): Observable<any> {
    return this.http.post(`http://localhost:3000/cart`, cartData, {
      observe: 'response',
    }); 
  }

  getCartList(userId: any): Observable<any> {
    return this.http.get(`http://localhost:3000/cart?userId=${userId}`, {
      observe: 'response',
    });
  }

  removeCart(cartId: any) {
    return this.http.delete(`http://localhost:3000/cart/${cartId}`, {
      observe: 'response',
    }); 
  } 
}
