import { UserAuthComponent } from './user-auth/user-auth.component';
import { Routes } from '@angular/router';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerGetProductComponent } from './seller-get-product/seller-get-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartInfoComponent } from './cart-info/cart-info.component';
import { ChackoutComponent } from './chackout/chackout.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  }, {
    path: 'seller-auth',
    component: SellerAuthComponent,
  },
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'seller-add-product',
    component: SellerAddProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'seller-get-product',
    component: SellerGetProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'seller-update-product/:id',
    component: SellerUpdateProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search/:query',
    component: SearchResultComponent, 
  },
  {
    path: 'details/:productId',
    component: ProductDetailsComponent, 
  },
    {
    path: 'user-auth',
    component: UserAuthComponent
  },
  {
    path: 'cart-info',
    component: CartInfoComponent
  },
  {
    path: 'checkout',
    component: ChackoutComponent
  },
];
