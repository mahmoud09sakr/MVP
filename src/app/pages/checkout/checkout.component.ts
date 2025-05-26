import { CheckoutService } from './../../core/services/checkout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CommonModule, TranslatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  cartId: string = '';
  shippingForm!: FormGroup;
  method: string = '';
  private PLATFORM_ID = inject(PLATFORM_ID)
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private CheckoutService: CheckoutService,
    private router: Router,
    private cart: CartService
  ) {
    this.ActivatedRoute.paramMap.subscribe((p) => {
      this.cartId = p.get('id') as string;
      this.method = p.get('term') as string;
    });

    this.shippingForm = this.fb.group({
      shippingAddress: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        postalCode: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{5}$')],
        ],
        country: ['', Validators.required],
      }),
      serviceType: ['', Validators.required],
    });
  }

  onSubmit() {

      if (this.method == 'online') {
        this.CheckoutService.onlineCheckOut(
          this.cartId,
          this.shippingForm.value
        ).subscribe({
          next: (res) => {
            if (isPlatformBrowser(this.PLATFORM_ID)) {
              window.open(res.url, '_self');
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    
    //  else if (this.method == 'tap') {
    //   this.CheckoutService.onlineCheckOutwithTap(
    //     this.cartId,
    //     this.shippingForm.value
    //   ).subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       window.open(res.paymentUrl, '_self');
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     },
    //   });
    // } 
    else {
      this.CheckoutService.cashCheckOut(
        this.cartId,
        this.shippingForm.value
      ).subscribe({
        next: (res) => {
          this.router.navigate(['payment/success']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  get shippingAddress() {
    return this.shippingForm.get('shippingAddress') as FormGroup;
  }

  get serviceType() {
    return this.shippingForm.get('serviceType');
  }

  getErrorMessage(controlName: string, parent?: string): string {
    const control = parent
      ? this.shippingAddress.get(controlName)
      : this.shippingForm.get(controlName);
    if (!control || !control.touched || !control.errors) return '';

    if (control.errors['required']) return 'This field is required.';
    if (control.errors['pattern']) return 'Invalid format.';

    return '';
  }
}
