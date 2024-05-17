import { product } from './../data-type';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-get-product',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  providers: [ProductService],
  templateUrl: './seller-get-product.component.html',
  styleUrl: './seller-get-product.component.css',
})
export class SellerGetProductComponent implements OnInit {
  constructor(private services: ProductService) {}
  public productList: undefined | product[];
  public deleteProductMessage: string | undefined;

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct() {
    this.services.getProducts().subscribe((response: any) => {
      this.productList = response;
    });
  }
  deleteProduct(id: any) {
    this.services.deleteProduct(id).subscribe((response: any) => {
      if (response) {
        this.deleteProductMessage = 'Delete Product successfully.';
        this.getProduct();
      }
      setTimeout(() => {
        this.deleteProductMessage = undefined;
      }, 3000);
    });
  }
}
