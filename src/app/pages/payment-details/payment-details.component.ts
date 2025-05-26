import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, computed, Inject, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Dialog } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { PaymentDetailsItemComponent } from "../../shared components/payment-details-item/payment-details-item.component";
import { CartService } from '../../core/services/cart.service';
import { CheckoutService } from '../../core/services/checkout.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthDialogService } from '../../core/services/auth-dialog.service';

@Component({
  selector: 'app-payment-details',
  imports: [InputTextModule, Dialog,ReactiveFormsModule, CommonModule,TranslatePipe, TextareaModule, ReactiveFormsModule, RadioButtonModule, FormsModule, PaymentDetailsItemComponent],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent {
 items:MenuItem[]=[]
 dialogWidth: string = '80vw';

 visible: boolean = false;
 modal: string = '';
  shippingForm: any;
 showDialog(item: string) {
   this.modal = item;

   this.visible = true;
 }
 selectedPayment: string = 'card';


fb = inject(FormBuilder); 



 initForm() {
  this.shippingForm = this.fb.group({
    shippingAddress: this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      country: ['', Validators.required],
    }),
    serviceType: ['', Validators.required],
    method:['card',Validators.required]
  });
}

CartService = inject(CartService);
cartId: any;
cartItems = computed(this.CartService.Items);
  totalCartPrice = computed(this.CartService.price);
  cartCounter = computed(this.CartService.noItems);
method: 'card' | 'cash' | 'tamara' | 'tabby' = 'card';

constructor() {
  this.initForm();
  // Fetch cart data immediately in constructor
  this.CartService.getUserCart().subscribe({
    next: (res) => {
      this.cartId = res.cart._id;
      this.CartService.counter.set(res.cart.cartItems.length);
      this.CartService.price.set(res.cart.totalPrice);
      this.CartService.noItems.set(res.cart.cartItems.length);

      this.CartService.Items.set(
        res.cart.cartItems.map((item: any) => ({
          ...item,
          product: {
            ...item.product,
            name: this.parseJSON(item.product.name),
            description: this.parseJSON(item.product.description),
          },
        }))
      );
    },
    error: (err) => {
      console.log(err);
    },
  });
}

ngOnInit(): void {
  // Remove getCart() from here
  this.items = [
    {
      label: 'السلة',
      routerLink: 'cart',
      styleClass: 'active'
    },
    {
      label: 'معلومات الطلب',
      routerLink: 'info',
      styleClass: 'active'
    },
    {
      label: 'الدفع',
      routerLink: 'payment'
    }
  ];
}
  // Remove or comment out the separate getCart() method since we're handling it in constructor
  // ✅ Helper Function to Parse JSON Values Safely
  parseJSON(value: any): { en: string; ar: string } {
    if (typeof value === 'object' && value !== null) {
      return value; // Already an object
    }
    try {
      return JSON.parse(value); // Parse if it's a string
    } catch (error) {
      return { en: value, ar: value }; // Fallback: Use same text for both languages
    }
  }

  parseDescription(description: string): { en: string; ar: string } {
    try {
      return JSON.parse(description);
    } catch (error) {
      return { en: description, ar: description }; // Fallback: same text for both languages
    }
  }

  CheckoutService=inject(CheckoutService)
  router=inject(Router)
  authDialog=inject(AuthDialogService)


  
  onSubmit() {


    // if(localStorage.getItem('userToken')){
      this.shippingForm.get('serviceType')?.setValue('delivery');
      
      // Create a copy of form value without the method field
      const { method, ...formDataWithoutMethod } = this.shippingForm.value;
      
      if (this.shippingForm.controls['method']?.value === 'card') {
       
        this.CheckoutService.onlineCheckOut(
          this.cartId,
          formDataWithoutMethod
        ).subscribe({
          next: (res) => {
           
            this.CartService.deleteCart().subscribe({
              next:(res)=>{  
              }
            })
            window.open(res.url, '_self');
          },
          error: (err) => {
          
          },
        });
      } else {
        
        this.CheckoutService.cashCheckOut(
          this.cartId,
          formDataWithoutMethod
        ).subscribe({
          next: (res) => {
           
            this.CartService.deleteCart().subscribe({
              next:(res)=>{
              
              }
            })
            this.router.navigate(['payment/success']);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    // }
    //  else {
    //   console.log('not login');
    //   this.authDialog.openLoginDialog();
    // }



   
  }

  get shippingAddress() {
    return this.shippingForm.get('shippingAddress') as FormGroup;
  }

  get serviceType() {
    return this.shippingForm.get('serviceType');
  }

  getErrorMessage(controlName: string, parent?: string): string {
    const control = parent
      ? this.shippingForm.get(parent)?.get(controlName)
      : this.shippingForm.get(controlName);
    
    if (!control || !control.touched || !control.errors) return '';
  
    if (control.errors['required']) return 'This field is required.';
    if (control.errors['email']) return 'Please enter a valid email address.';
    if (control.errors['pattern']) {
      if (controlName === 'phone' || controlName === 'phone2') {
        return 'Please enter a valid phone number.';
      }
      if (controlName === 'postalCode') {
        return 'Postal code must be 5 digits.';
      }
      if (controlName === 'carYear') {
        return 'Please enter a valid 4-digit year.';
      }
      return 'Invalid format.';
    }
    if (control.errors['minlength']) {
      return `Minimum length is ${control.errors['minlength'].requiredLength} characters.`;
    }
  
    return '';
  }






}
