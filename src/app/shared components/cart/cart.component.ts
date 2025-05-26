import { CartService } from './../../core/services/cart.service';
import { Product } from './../../core/interfaces/products';
import { CommonModule, CurrencyPipe, isPlatformBrowser, NgFor, NgStyle } from '@angular/common';
import {
  Component,
  computed,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewEncapsulation,
  WritableSignal,
} from '@angular/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { TranslatePipe } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CartElementComponent } from "../cart-element/cart-element.component";
import { AuthDialogService } from '../../core/services/auth-dialog.service';

// Update the Brand interface
interface Brand {
  label: string;  // Will hold the name in current language
  value: string;  // Will hold the _id
  logo?: string;  // Optional logo URL
}
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ButtonModule,
    ImageModule,
    DividerModule,
    InputTextModule,
    FormsModule,
    RadioButtonModule,
    CartElementComponent
],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class CartComponent implements OnInit {
  CartService = inject(CartService);
  isCartOpen = false;
  currentLang = 'en';
  isRtl = false;
  noData = signal(false); // Signal to track if there are no items in the cart  

  // cartItems = computed(this.CartService.Items);
  cartItems = computed(() => this.CartService.Items() || []);
  totalCartPrice = computed(this.CartService.price);
  cartCounter = computed(this.CartService.noItems);

  cartId: string = '';
  shipping: string = 'shipping'; // Set default value
  shipping2:boolean=false

  constructor(
    private myTranslate: MyTranslateService,
    private toastr: ToastrService
  ) {
    this.myTranslate.lang.subscribe((res) => {
      this.currentLang = res;
      if (res == 'ar') {
        this.isRtl = true;
      } else {
        this.isRtl = false;
      }
    });
  }

  items:MenuItem[]=[]
  ngOnInit(): void {
    this.items = [
      {
        label: 'السلة',
        routerLink: 'cart',
        styleClass: 'active'
      }
      ,
      {
        label: 'معلومات الطلب',
        routerLink: 'info'
      },
      {
        label: 'الدفع',
        routerLink: 'payment'
      }
    ];
    this.getCart();
  }
  getCart() {

    this.CartService.getUserCart().subscribe({
      next: (res) => {
        console.log("cart response from line 104" ,res);
        

        // this.CartService.Items.set(res.cart.cartItems)
        this.cartId = res.cart._id;
        this.CartService.counter.set(res.cart.cartItems.length);
        this.CartService.price.set(res.cart.totalPrice);
        this.CartService.noItems.set(res.cart.cartItems.length);
        console.log(this.CartService.Items, 'cart Items');
        
        this.CartService.Items.set(
          res.cart.cartItems.map((item: any) => ({
            ...item,
            product: {
              ...item.product,
              name: this.parseJSON(item.product.name), // Ensure name is parsed correctly
              description: this.parseJSON(item.product.description), // Ensure description is parsed correctly
            },
          }))
        );
        res.cart.cartItems? 
        this.noData.set(false):
        this.noData.set(true); // Set nonoData to true if there are no items in the cart
        console.log(this.CartService.Items, 'cart Items');
        console.log("cartitems", this.cartItems());
        console.log("cartitems / line 121 cart.ts" , this.cartItems());


      },
      error: (err) => {
        this.noData.set(true); // Set nonoData to true if there's an error or no items
        console.log(err);
      },
    });
  }

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

updateNoData(event : any){
event.length === 0 ? this.noData.set(true) : this.noData.set(false);
console.log("event" ,event);
 // Update nonoData based on cart items length
}



  // updateQuantity(id: string, quantity: number) {
  //   console.log('update', id, quantity);

  //   if (quantity === 0) {
  //     this.removeItem(id); // If quantity is 0, remove the item
  //   } else {
  //     this.CartService.updateProductQuantity(id, quantity).subscribe({
  //       next: (res) => {
  //       
  //         this.showSuccess(res.message);
  //         this.cartId = res.cart._id;

  //         this.CartService.counter.set(res.cart.cartItems.length);
  //         this.CartService.price.set(res.cart.totalPrice);
  //         this.CartService.noItems.set(res.cart.cartItems.length);
  //         this.CartService.Items.update((items) =>
  //           items.map((item) =>
  //             item.product._id === id
  //               ? { ...item, quantity } // Update only the matching item
  //               : item
  //           )
  //         );
  //       },
  //       error: (err) => {
  //         console.log(err);
  //         this.showError(err.error.err);
  //       },
  //     });
  //   }
  // }

  deleteCart() {
    this.CartService.deleteCart().subscribe({
      next: (res) => {
      
        // this.cartId = res.cart._id;
        this.CartService.counter.set(0);
        this.CartService.Items.set([]);
        this.CartService.price.set(0);
        this.CartService.noItems.set(0);
        this.showSuccess(res.message);
        this.noData.set(true); // Set nonoData to true if the cart is empty
      },
      error: (err) => {
        console.log(err);
        this.showError(err.error.err);
      },
    });
  }

  showSuccess(msg: string) {
    this.toastr.success(msg, 'Premium Tires');
  }

  showError(msg: string) {
    this.toastr.error(msg, 'Premium Tires');
  }

  couponCode = signal(''); // Signal to store the coupon value
  successCoupon = signal(false);
  errorCoupon = signal(false);
  onSubmit(event: Event) {
    event.preventDefault(); // 🚀 Prevents page refresh

    event.preventDefault(); // Pr
    // event default form submission behavior
    const inputElement = (event.target as HTMLFormElement).querySelector(
      'input'
    );
    
    if (inputElement) {
      this.couponCode.set(inputElement.value); // Save the input value
      this.CartService.applyCoupon(this.couponCode()).subscribe({
        next: (res) => {
        
          this.successCoupon.set(true);
          this.errorCoupon.set(false);
          this.CartService.price.set(res.cart.totalPriceAfterDiscount);
        },
        error: (err) => {
          console.log(err);
          this.successCoupon.set(false);

          this.errorCoupon.set(true);
        },
      });
    }
  }
  private auth = inject(AuthService);
  isLoggedIn = computed(this.auth.isLoggedIn);
  private route = inject(Router);
  // navigation(cartId: string, method: String) {
  //   this.toggleCart();
  //   if (this.isLoggedIn()) {
  //     this.route.navigate(['/checkout', cartId, method]);
  //   } else {
  //     this.route.navigate(['/login']);
  //   }
  // }

  authDialog=inject(AuthDialogService)
PLATFORM_ID=inject(PLATFORM_ID)
router=inject(Router)
  checkout(){
    if(localStorage.getItem('userToken')){
      this.router.navigate(['/paymentDetails'], {
        state: {
          cartItems: this.cartItems(),
          totalPrice: this.totalCartPrice(),
          cartId: this.cartId
        }
      });
    } else {
      this.authDialog.openLoginDialog();
    }
  }
  // }




}
