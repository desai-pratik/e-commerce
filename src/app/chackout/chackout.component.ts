import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'; 
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chackout',
  standalone: true,
  // imports: [FormsModule, ReactiveFormsModule, HttpClientModule], 
  templateUrl: './chackout.component.html',
  styleUrl: './chackout.component.css',
})
export class ChackoutComponent {
  // constructor(private formBuilder: FormBuilder, private router: Router) {
  //   this.userInfo = this.formBuilder.group({
  //     email: ['', Validators.required],
  //     address: ['', Validators.required],
  //     contact: ['', Validators.required],
  //   });
  // }
  // public userInfo: FormGroup;

  // getUserInfo() {
  //   console.log(this.userInfo.value);
  // }
}
