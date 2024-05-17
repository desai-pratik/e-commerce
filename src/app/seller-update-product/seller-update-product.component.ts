import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { product } from '../data-type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [ProductService],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | product;
  public updateProductForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private services: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.updateProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      color: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    let productId = this.activatedRoute.snapshot.paramMap.get('id');
    productId &&
      this.services.getProduct(productId).subscribe((data) => {
        this.productData = data;
        this.updateProductForm.patchValue(data);
      });
  }

  updateProduct() {
    const formData: product = this.updateProductForm.value;
    this.services
      .updateProduct(this.activatedRoute.snapshot.paramMap.get('id'), formData)
      .subscribe((response: any) => {
        this.router.navigate(['seller-get-product']);
      });
  }
}
