import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { priceSummary } from '../data-type';

@Component({
  selector: 'app-cart-info',
  standalone: true,
  imports: [HttpClientModule, RouterLink, TitleCasePipe, TitleCasePipe],
  providers: [ProductService],
  templateUrl: './cart-info.component.html',
  styleUrl: './cart-info.component.css',
})
export class CartInfoComponent implements OnInit {
  public cartList: any = [];
  public priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tex: 0,
    delivery: 0,
    total: 0,
  };

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    userData &&
      this.productService
        .getCartList(userData.id)
        .subscribe((response: any) => {
          if (response && response.body) {
            this.cartList = response.body;

            response.body.forEach((item: any) => {
              if (item.quantity) {
                this.priceSummary.price =
                  this.priceSummary.price + +item.price * +item.quantity;
              }
            });
            this.priceSummary.tex = +(this.priceSummary.price / 18).toFixed(1);
            this.priceSummary.discount = this.priceSummary.price / 10;
            this.priceSummary.delivery = 100;
            this.priceSummary.total =
              this.priceSummary.price +
              this.priceSummary.tex -
              this.priceSummary.discount +
              this.priceSummary.delivery
          }
        });
  }
  removeCard(data: any) {
    this.productService.removeCart(data).subscribe(() => {
      this.getData();
    });
  }
}
