import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { loginValue, signUpValue } from '../data-type';
import { AuthGuard } from '../auth.guard';

@Injectable({
  providedIn: 'root',
})
export class SellerAuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthGuard
  ) {}

public isErrorLogin = new EventEmitter<boolean>(false)

  signUpAuth(data: signUpValue) {
    this.http.post('http://localhost:3000/seller', data).subscribe((res) => {});
  }

  loginAuth(data: loginValue) {
    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((response: any) => {
        if (response && response.body && response.body.length) {
          this.auth.login();
          localStorage.setItem('seller', JSON.stringify(response.body[0]));
          this.router.navigate(['seller-home']);
        }else{
          this.isErrorLogin.emit(true);
        }
      });
  }
}
