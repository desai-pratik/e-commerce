import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'header',
  standalone: true,
  imports: [HttpClientModule, RouterLink, TitleCasePipe],
  providers: [ProductService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  public menuType = 'default';
  public userInfo: any;
  public cartItem: number = 0;
  public userLater: any;

  constructor(private router: Router, private productService: ProductService) {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    userData &&
      this.productService
        .getCartList(userData.id)
        .subscribe((response: any) => {
          if (response && response.body) {
            this.cartItem = response.body.length;
          }
        });
  }

  ngOnInit(): void {
    this.router.events.subscribe((res: any) => {
      if (res.url) {
        if (localStorage.getItem('seller') && res.url.includes('seller')) {
          this.menuType = 'seller';
          let localData = localStorage.getItem('seller');
          this.userInfo = localData && JSON.parse(localData);
        } else if (localStorage.getItem('user')) {
          this.menuType = 'user';
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userLater = userData.name.charAt(0).toLowerCase();
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  logout(data: string) {
    localStorage.removeItem(data);
    this.router.navigate(['/']);
  }
  clickSearch(val: any) {
    this.router.navigate([`search/${val}`]);
  }
  onFormSubmit(event: Event) {
    event.preventDefault();
  }
}
