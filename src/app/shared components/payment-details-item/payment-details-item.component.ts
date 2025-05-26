import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details-item',
  imports: [RouterLink],
  templateUrl: './payment-details-item.component.html',
  styleUrl: './payment-details-item.component.css'
})
export class PaymentDetailsItemComponent {
  @Input() product!: any  ;
  cartService=inject(CartService)
  quantity=signal(1)
  constructor(    private toastr: ToastrService){}
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
        

return
      }
      this.cartService.updateProductQuantity(this.product.product.id,this.quantity()).subscribe({
        next:(res)=>{
         
          this.showSuccess('تم تعديل الكميه بنجاح')
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
