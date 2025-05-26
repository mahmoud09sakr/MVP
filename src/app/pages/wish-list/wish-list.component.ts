import { WishListService } from './../../core/services/wish-list.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/interfaces/products';
import { CartService } from '../../core/services/cart.service';
import { TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  imports: [CommonModule,
    //TranslatePipe,
    RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
})
export class WishListComponent implements OnInit {
  wishlist: any[] = [];
  currentLang: string = '';
  constructor(
    private whishListService: WishListService,
    private cart: CartService,
    private myTranslate: MyTranslateService,
    private toastr: ToastrService
  ) {
    this.myTranslate.lang.subscribe((res) => {
      this.currentLang = res;
    });
  }
  ngOnInit(): void {
    this.whishListService.getWishList().subscribe({
      next: (res) => {
     
        this.wishlist=res.wishList
        this.whishListService.counter.set(res.wishList.length)
        
        // this.wishlist = res.wishList.map((item: any) => ({
        //   ...item,
        //   name: JSON.parse(item.name),
        // }));
        // console.log('whishList after update', this.wishlist);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItem(itemId: string) {
    this.whishListService.deleteProductFrommWishList(itemId).subscribe({
      next: (res) => {
        this.showSuccess('تم ازالة المنتج من المفضله')
  this.wishlist=res.wishList
            this.whishListService.counter.set(res.wishList.length);

        // Creating a new reference to trigger Angular change detection
        // this.wishlist = res.wishList.map((item: any) => ({
        //   ...item,
        //   name: JSON.parse(item.name), // Fixing JSON parsing
        // }));
        // this.showSuccess(res.message);
      },
      error: (err) => {
        console.log(err);
        this.showError('حدث خطأ ما');
      },
    });
  }

  showSuccess(msg: string) {
    this.toastr.success(msg, 'Premium Tires');
  }
  
  showError(msg: string) {
    this.toastr.error(msg, 'Premium Tires');
  }



  // addToCart(id: string) {
  //   console.log('add', id);
  //   this.cart.AddProductToCart(id, 1).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.cart.counter.set(res.cart.cartItems.length);
  //       // this.showSuccess(res.message);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       // this.showError(err.error.err);
  //     },
  //   });
  // }

  // showSuccess(msg: string) {
  //   this.toastr.success(msg, 'Premium Tires');
  // }

  // showError(msg: string) {
  //   this.toastr.error(msg, 'Premium Tires');
  // }
}
