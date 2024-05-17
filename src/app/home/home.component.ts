import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'home',
  standalone: true,
  imports: [HttpClientModule, RouterLink, TitleCasePipe],
  providers: [ProductService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public popularProductList: undefined | product[];
  public allProductList: undefined | product[];

  constructor(private services: ProductService) {}
  ngOnInit(): void {
    this.services.popularProduct().subscribe((response: any) => {
      this.popularProductList = response;
    });

    this.services.getProducts().subscribe((response: any) => {
      this.allProductList = response;
    });

  }

}
