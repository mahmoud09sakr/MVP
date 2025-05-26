import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  signal,
  WritableSignal,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl: string = environment.baseUrl;
  token = '';
  sessionId = '';
  PLATFORM_ID = inject(PLATFORM_ID);
  counter: WritableSignal<number> = signal(0);
  Items: WritableSignal<any[]> = signal([]);
  price: WritableSignal<number> = signal(0);
  noItems: WritableSignal<number> = signal(0);
  auth=inject(AuthService)
  userData!: any

  constructor(private http: HttpClient) {
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      this.token = localStorage.getItem('userToken') || '';
      this.sessionId = localStorage.getItem('sessionId') || '';
      this.userData=localStorage.getItem('userData')

    }


    // this.auth.isLogin.subscribe({
    //   next:(res)=>{
    //     console.log(res);
        
    //   }
    // })

 
    
  }



   getHeaders(): Record<string, string> {

      //  if(isPlatformBrowser(this.PLATFORM_ID))
      //     this.sessionId= localStorage.getItem('sessionId') || '';
      //   this.token = localStorage.getItem('userToken') || '';
      //   console.log("SESSIONID" , this.sessionId);
        
   
  if (this.token) {
      console.log("tokennn " , this.token);
      
      return {
        'Authorization': `${JSON.parse(this.userData).role} ${this.token}`
      };
    }
    else if (this.sessionId) {
      return {
        'sessionid': this.sessionId
      };
    } 
    else if (this.sessionId == '') {
      if(isPlatformBrowser(this.PLATFORM_ID)){
        this.sessionId= localStorage.getItem('sessionId') || '';
      }
      console.log("sessionid" , this.sessionId);
      return {
        'sessionid': this.sessionId
      };
    } 
 else {
  console.log(this.sessionId);
  
  console.log('there is no token or session id');
  
  return {}
 }
  }

  getSessionId() {
    return this.http.get(`${this.baseUrl}/cart/get-session-id`);
  }

  AddProductToCart(productId: string, quantity: number) {
    console.log("productId from line 73 cart.service.ts" , productId);
    console.log("quantity from line 73 cart.service.ts" , quantity);
    
    return this.http.post(`${this.baseUrl}/cart/add-product`, 
      { productId, quantity },
      { headers: this.getHeaders() }
    );
  }

  getCart() {
    return this.http.get(`${this.baseUrl}/cart/get-user-cart`, {
      headers: this.getHeaders()
    });
  }

  removeCartItem(productId: string) {
    return this.http.delete(`${this.baseUrl}/cart/remove-product/${productId}`, {
      headers: this.getHeaders()
    });
  }

  updateQuantity(productId: string, quantity: number) {
    return this.http.patch(`${this.baseUrl}/cart/update/${productId}`, 
      { quantity },
      { headers: this.getHeaders() }
    );
  }

  getUserCart(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cart/get-user-cart`, {
      headers: this.getHeaders()
    });
  }

  updateProductQuantity(productId: string, quantity: number): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/cart/update/${productId}`,
      { quantity },
      { headers: this.getHeaders() }
    );
  }

  removeProductFromCart(productId: string): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/cart/remove-product/${productId}`,
      { headers: this.getHeaders() }
    );
  }

  deleteCart(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cart/delete`, {
      headers: this.getHeaders()
    });
  }

  applyCoupon(coupon: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/cart/apply-coupon`,
      { code: coupon },
      { headers: this.getHeaders() }
    );
  }
}