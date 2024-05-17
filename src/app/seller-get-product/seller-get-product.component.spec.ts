import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerGetProductComponent } from './seller-get-product.component';

describe('SellerGetProductComponent', () => {
  let component: SellerGetProductComponent;
  let fixture: ComponentFixture<SellerGetProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerGetProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerGetProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
