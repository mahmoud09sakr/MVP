import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Product } from './../../core/interfaces/products';
import { Component, inject, Input, OnChanges, Output, signal, SimpleChanges, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-element',
  imports: [RouterLink],
  templateUrl: './cart-element.component.html',
  styleUrl: './cart-element.component.css'
})
export class CartElementComponent implements OnChanges {
  @Input() product!: any  ;
  cartService=inject(CartService)
  quantity=signal(1)

  @Output() removeItemFromCart = new EventEmitter<any>()
  constructor(    private toastr: ToastrService
  ){}
  ngOnChanges(changes: SimpleChanges): void {
   this.quantity.set(this.product.quantity)
  }

  updateQuantity(term:string){
    
    if(term=='p'){
      this.quantity.update((prev)=>prev+1)
      this.cartService.updateProductQuantity(this.product.product.id,this.quantity()).subscribe({
        next:(res)=>{
         
          this.showSuccess('تم تعديل الكميه بنجاح')
          this.cartService.price.set(res.cart.totalPrice)

          
        },error:(err)=>{
          console.log(err);
          this.quantity.update((prev)=>prev-1)
          this.showError(  'لقد حدث خطأ ما')


          
        }
      })
    }else{
  
      this.quantity.update((prev)=>prev-1)
      if(this.quantity()<=1){
        this.quantity.set(1)
        this.showSuccess('تم تعديل الكميه بنجاح')


return
      }
      this.cartService.updateProductQuantity(this.product.product.id,this.quantity()).subscribe({
        next:(res)=>{
         
          this.cartService.price.set(res.cart.totalPrice)

          
        },error:(err)=>{
          console.log(err);
          this.quantity.update((prev)=>prev+1)
          this.showError(  'لقد حدث خطأ ما')


          
        }
      })
     
  
    }
  }

  calculateTotal(): number {
    const price = (this.product.product.priceAfterDiscount != this.product.product.price && 
                   this.product.product.priceAfterDiscount !== 0) ? 
                  this.product.product.priceAfterDiscount : 
                  this.product.product.price;
    return price * this.quantity();
  }

  removeItem(ProductId: any) {
    this.cartService.removeProductFromCart(ProductId).subscribe({
      next: (res:any) => {
       
        this.showSuccess('تم ازالة المنتج من عربه التسوق')
        this.cartService.counter.set(res.cart.cartItems.length);
        this.cartService.price.set(res.cart.totalPrice);
        this.cartService.noItems.set(res.cart.cartItems.length);
        this.cartService.Items.update((items) =>
          items.filter((item) => item.product._id !== ProductId)
        );
        this.removeItemFromCart.emit(this.cartService.Items()); // Emit the event to notify parent component
      },
      error: (err:any) => {
        console.log(err);
        this.showError(  'لقد حدث خطأ ما')

      },
    });
  }
  




  showSuccess(msg: string) {
    this.toastr.success(msg, 'Premium Tires');
  }

  showError(msg: string) {
    this.toastr.error(msg, 'Premium Tires');
  }
}
