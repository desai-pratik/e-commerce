import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, loginValue, product, signUpValue } from '../data-type';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthGuard,
    private productService: ProductService
  ) {}
  public isErrorLogin:string = "";

  addUser(data: signUpValue): Observable<any> {
    return this.http.post(`http://localhost:3000/user`, data, {
      observe: 'response',
    });
  }

  // loginAuth(data: loginValue) {
  //   this.http
  //     .get(
  //       `http://localhost:3000/user?email=${data.email}&password=${data.password}`,
  //       { observe: 'response' }
  //     ).subscribe((response: any) => {       
  //       debugger
  //        if (response.body[0].email === data.email && response.body[0].password === data.password ) {
  //         localStorage.setItem('user', JSON.stringify(response.body[0]));
  //         this.router.navigate(['/']);
  //       } else {
  //         this.isErrorLogin = "Email or Password is not Valid..";
  //       }
  //     });
  // }

  getUser(): Observable<any> {
    return this.http.get("http://localhost:3000/user");
  }

 


}
