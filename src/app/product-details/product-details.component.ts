import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule, HttpClientModule, TitleCasePipe],
  providers: [ProductService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  public productQuantity: number = 1;
  public removeCart = false;
  public errorMessage: string = '';
  constructor(
    private services: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public productId = this.activatedRoute.snapshot.paramMap.get('productId');
  ngOnInit(): void {
    this.productId &&
      this.services.getProduct(this.productId).subscribe((data) => {
        this.productData = data;
      });

    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    this.services.getCartList(userData.id).subscribe((response: any) => {
      if (response && response.body) {
        let items = response.body.filter(
          (item: product) => this.productId === item.id
        );
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }
    });

    // }
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity++;
    }
    if (this.productQuantity > 1 && val === 'minus') {
      this.productQuantity--;
    }
  }
  // addToCard() {
  //   if (this.productData && this.productQuantity > 0) {
  //     this.productData.quantity = this.productQuantity;
  //     if (!localStorage.getItem('user')) {
  //       this.services.localAddToCard(this.productData);
  //       this.removeCart = true;
  //     }else{
  //       let user = localStorage.getItem('user');
  //       let userId = user && JSON.parse(user).id
  //       let cartData: cart ={
  //         ...this.productData,
  //         userId,
  //         productId: this.productData.id
  //       }
  //       delete cartData.id
  //       this.services.addCart(cartData).subscribe(()=>{
  //         this.removeCart = true;
  //       })
  //     }
  //   }
  // }

  addToCard() {
    if (this.productData && this.productQuantity > 0) {
      this.productData.quantity = this.productQuantity;
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      if (userId) {
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        this.services.addCart(cartData).subscribe(() => {
          this.errorMessage = 'Add Cart !!!';
        }); 
        this.removeCart = true;
      } else {
        this.errorMessage = 'Login First !!!';
      }
    }
  }

  removeCard(productId: any) {
    this.services.removeCart(productId).subscribe(() => {
      this.removeCart = false;
      this.errorMessage = 'Remove Cart !!!';
    });
  }
}
