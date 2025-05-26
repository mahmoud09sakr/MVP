import { Component, Input, signal, PLATFORM_ID, inject, ViewEncapsulation, OnChanges, SimpleChanges, Inject, NgZone } from '@angular/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { isPlatformBrowser, JsonPipe, NgClass } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { WishListService } from '../../core/services/wish-list.service';
import { authGuard } from '../../core/guards/auth.guard';
import { AuthDialogService } from '../../core/services/auth-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { Dialog } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { log } from 'console';
import { FastPayDialogService } from '../../core/services/fast-pay-dialog.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink,Dialog,NgClass, Dialog, ButtonModule,Rating,FormsModule],

  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  encapsulation:ViewEncapsulation.None
})
export class ProductCardComponent implements OnChanges{
@Input()product:any

currentLang=''
quantity=signal(1)
  private ngZone = inject(NgZone);
  private _fastPayDialogService = inject(FastPayDialogService)

currentUrl:any
  rating: number = 4.3;

constructor(private myTranslate: MyTranslateService,private router: ActivatedRoute,
  private toastr: ToastrService,
) {
   this.currentUrl = this.router.url;
  // this.myTranslate.lang.subscribe((res) => {
  //   this.currentLang = res;
  // });
}
ngOnChanges(changes: SimpleChanges 
): void {


 

  // // Check if this is a tire product (has a `productId` key)
  // if (this.product?.productId) {
  //   // It’s a tire instance
  //   const tire = this.product;
  //   const baseProduct = tire.productId;

  //   this.product = {
  //     ...baseProduct,
  //     tire_width: tire.tire_width,
  //     aspect_ratio: tire.aspect_ratio,
  //     wheel_diameter: tire.wheel_diameter,
  //     tireDrawType: tire.tireDrawType,
  //     speed_rating: tire.speed_rating,
  //     load_index: tire.load_index,
  //     yearOfProduction: tire.yearOfProduction,
  //     warranty: tire.warranty,
  //     brand: {
  //       ...tire.tire_brand,
  //     }
  //   };

  //   console.log(this.product, "✅ normalized tire product");
  // } else {
  //   console.log(this.product, "✅ regular product");
  // }
}


updateQuantity(term:string){
 
  
  if(term=='p'){
    this.quantity.update((prev)=>prev+1)
  }else{

    this.quantity.update((prev)=>prev-1)
    if(this.quantity()<=1){
      this.quantity.set(1)
    }

  }
}
comparisonList = signal<string[]>([])
PLATFORM_ID = inject(PLATFORM_ID)

compare(id: string) {

  
  if (isPlatformBrowser(this.PLATFORM_ID)) {
    const storedList = localStorage.getItem('comparisonList');
    // Initialize the signal with stored data only once
    if (storedList) {
      this.comparisonList.set(JSON.parse(storedList));

      if (this.comparisonList().length >= 4) {
        this.showError('يمكنك اضافه 4 عناصر بحد اقصي الي المقارنة');
        return;
      }
      
    }

    if (!this.comparisonList().includes(id)) {
      this.comparisonList.update(list => [...list, id]);
      

        localStorage.setItem('comparisonList', JSON.stringify(this.comparisonList()));
      
    }
  }

  if(this.comparisonList().length <= 4){
    this.showSuccess('تم اضافة المنتج الي المقارنة')

  }

}
// getProductName(lang: 'en' | 'ar'): string {
//   if (!this.product?.name) return '';
  
//   // Handle direct language property
//   if (typeof this.product.name[lang] === 'string') {
//     return this.product.name[lang];
//   }
  
//   // Handle nested language property
//   if (this.product.name[lang]?.[lang]) {
//     return this.product.name[lang][lang];
//   }
  
//   // Fallback to any available string
//   return this.product.name[lang] || 
//          this.product.name[lang]?.[lang] || 
//          this.product.name.toString() || 
//          '';
// }

 
CartService=inject(CartService)
addToCart(id: string) {
  
  this.CartService.AddProductToCart(id, this.quantity()).subscribe({
    next: (res:any) => {
console.log("success addToCart line 153 product-card.ts" , res);

     
      this.CartService.counter.set(res.cart.cartItems.length);
      console.log("counter line 156 product-card.ts" , this.CartService.counter());
      
      this.showSuccess('تمت اضافة المنتج الي عربة التسوق ')
    },
    error: (err) => {
      console.log("addToCart error failed line 159 product-card.ts" , err);
      this.showError("حدث خطأ ما حاول مره اخري")

    },
  });
}

wishList=inject(WishListService)
authDialogService=inject(AuthDialogService)
addToWishlist(productId: string) {
  if (isPlatformBrowser(this.PLATFORM_ID)) {
    let token = localStorage.getItem('userToken');

    if (!token) {
      // Use NgZone.run to properly handle the dialog opening
      this.ngZone.run(() => {
       
        
        this.openLogin()
      });
      return;
    }else{
      token = localStorage.getItem('userToken')

      this.wishList.addToWishList(productId).subscribe({
        next: (res: any) => {
          this.showSuccess('تمت اضافة المنتج الي المفضلة  ')

          
            this.wishList.counter.update((x)=>x+1);
          
        },
        error: (err: any) => {
          console.error('Wishlist error:', err.error.error.ar);
          if(err.error.error.en=='Product already exists in wishlist'){
            this.showError('هذا المنتج في المفضله بالفعل      ')

          }else{

            this.showError('حدث خطأ ما حاول مره اخري ')
          }

          if (err.status === 403) {
            this.ngZone.run(() => {
              this.authDialogService.openLoginDialog();
            });
          }
        },
      });
    }

  }
}
openLogin(){
  this.authDialogService.openLoginDialog()
}


showSuccess(msg: string) {
  this.toastr.success(msg, 'Premium Tires');
}

showError(msg: string) {
  this.toastr.error(msg, 'Premium Tires');
}


visible: boolean = false;

showDialog() {
    this.visible = true;

}


  bayProduct() {
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      let token = localStorage.getItem('userToken');

      if (!token) {
        // Use NgZone.run to properly handle the dialog opening
        this.ngZone.run(() => {
          this.authDialogService.openLoginDialog();
        });
        return;
      } else {

        this._fastPayDialogService.openDialog(this.product.id, this.quantity())

      }

    }
  }

}

