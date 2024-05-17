import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { cart, product } from '../data-type';
import { ProductService } from '../services/product.service';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [HttpClientModule, UserService, ProductService],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent implements OnInit {
  constructor(
    private services: UserService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthGuard
  ) {
    this.signUpUser = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }

  public signUpUser: FormGroup;
  public loginForm: FormGroup;
  public isoLogin = false;
  public errorMessage = '';

  signUp() {
    if (!this.signUpUser.invalid) {
      const formData = this.signUpUser.value;
      this.services.addUser(formData).subscribe(() => {
        localStorage.setItem('user', JSON.stringify(formData));
        this.router.navigate(['/']);
      });
    } else {
      this.errorMessage = 'Credential is not Valid...';
    }
  }

  login() {
    this.services.getUser().subscribe((data: any) => {
      let loginSuccessful = false;

      data.forEach((e: any) => {
        if (
          this.loginForm.value.email === e.email &&
          this.loginForm.value.password === e.password
        ) {
          this.auth.login();
          loginSuccessful = true;
          this.router.navigate(['/']);
          localStorage.setItem('user', JSON.stringify(e));
          this.localToRemoteCart();
        }
      });

      if (!loginSuccessful) {
        this.errorMessage = 'Email or Password is not Valid...';
      }
    });
  }

  openLogin() {
    this.isoLogin = !this.isoLogin;
  }

  localToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.productService.addCart(cartData).subscribe(() => {});
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
    setTimeout(() => {
      this.productService.getCartList(userId);
    }, 1000);
  }
}
