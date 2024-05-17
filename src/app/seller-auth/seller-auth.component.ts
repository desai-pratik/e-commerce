import { Component, OnInit } from '@angular/core';
import { loginValue } from '../data-type'; 
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../auth.guard';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SellerAuthService } from '../services/seller-auth.service';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [HttpClientModule, SellerAuthService ],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent implements OnInit {
  constructor(
    private services: SellerAuthService,
    private formBuilder: FormBuilder,
    private auth: AuthGuard,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    });

    this.loinForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public signUpForm: FormGroup;
  public loinForm: FormGroup;
  public isoLogin = false;
  public errorMessage = "";

  ngOnInit(): void {
    if (localStorage.getItem('seller')) {
      this.auth.login();
      this.router.navigate(['seller-home']);
    }
  }

  signUp() {
    const formData = this.signUpForm.value;
    this.services.signUpAuth(formData);
    this.auth.login();
    localStorage.setItem('seller', JSON.stringify(formData));
    this.router.navigate(['seller-home']);
  }
  login() {
    const formData = this.loinForm.value;
    this.services.loginAuth(formData); 
    if(this.services.isErrorLogin){
      this.errorMessage = "email or password is not valid.."
    }
  }

  openLogin() {
    this.isoLogin = !this.isoLogin;
  }
}
