import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { product } from '../data-type';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [HttpClientModule, RouterLink, TitleCasePipe],
  providers: [ProductService],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css',
})
export class SearchResultComponent implements OnInit {
  public productList: undefined | product[];
  public query: string | null = null;

  constructor(
    private services: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.query = this.activatedRoute.snapshot.paramMap.get('query');
    if (this.query !== null) {
      this.services.getProducts().subscribe((response: product[]) => {
        this.productList = this.filterProducts(response, this.query!);
      });
    }
  }

  filterProducts(products: product[], query: string): product[] {
    return products.filter((product) => {
      return Object.values(product).some((value) => {
        if (typeof value === 'string' && value.toLowerCase().includes(query.toLowerCase())) {
          return true;
        }
        return false;
      });
    });
  }  
}
