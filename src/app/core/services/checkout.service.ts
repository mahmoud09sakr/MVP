import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  baseUrl: string = environment.baseUrl;
  token = '';
PLATFORM_ID=inject(PLATFORM_ID)
userData!:any
  constructor(private http: HttpClient) {
if(isPlatformBrowser(this.PLATFORM_ID)){
  this.token = localStorage.getItem('userToken') as string;
  this.userData=localStorage.getItem('userData')
  console.log("'userdata" , this.userData);
  

}


  }

  onlineCheckOut(cartId: string, form: any): Observable<any> {
    if(isPlatformBrowser(this.PLATFORM_ID)){
      this.token = localStorage.getItem('userToken') as string;
      this.userData=localStorage.getItem('userData')
    
    }
    console.log(JSON.parse(this.userData).role);
    return this.http.post(
      `${this.baseUrl}/orders/checkOut-session/?cartId=${cartId}`,
      form,
      {
        headers: {
          Authorization: `${JSON.parse(this.userData).role} ${this.token}`,
        },
      }
    )
  }

  // onlineCheckOutwithTap(cartId: string, form: any): Observable<any> {
  //   console.log(this.token);
    
  //   return this.http.post(`${this.baseUrl}/orders/pay/${cartId}`, form, {
  //     headers: {
  //       Authorization: `Admin ${this.token}`,
  //     },
  //   });
  // }
  onlineClickPay(productId: string, quantity: number, serviceType: string, address: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/orders/checkOut-session?productId=${productId}`,
      {
        shippingAddress: address,
        serviceType: serviceType,
        quantity: quantity
      },
      {
        headers: {
          Authorization: `${JSON.parse(this.userData).role} ${this.token}`,
        },
      }
    );
  }
  cashCheckOut(cartId: string, form: any): Observable<any> {
    

    return this.http.post(
      `${this.baseUrl}/orders/create-cash-order/${cartId}`,
      form,
      {
        headers: {
          Authorization: `${JSON.parse(this.userData).role} ${this.token}`,
        },
      }
    );
  }
}
