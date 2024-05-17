import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [ProductService],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css',
})
export class SellerAddProductComponent {
  constructor(
    private formBuilder: FormBuilder,
    private services: ProductService,
    private router:Router
  ) {
    this.addProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      color: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });
  }
  public addProductForm: FormGroup;
  public addProductMessage: string | undefined;
 

  addProduct() {
    const formData: product = this.addProductForm.value;
    this.services.addProduct(formData).subscribe((response: any) => {
      if (response) {
        this.addProductMessage = 'Product added successfully.';
        this.router.navigate(['seller-get-product'])
      }
      setTimeout(() => {
        this.addProductMessage = undefined;
      },3000);
    });
  }
}
