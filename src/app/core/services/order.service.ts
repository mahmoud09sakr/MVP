
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { isPlatformBrowser } from '@angular/common';
import { json } from 'stream/consumers';
import { stringify } from 'querystring';
import { OrderResponse } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl: string = environment.baseUrl;
  token = '';
  PLATFORM_ID = inject(PLATFORM_ID);
  userData!: any;
  constructor(private http: HttpClient) { 
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      this.token =  localStorage.getItem('userToken') as string;
    }
  }

  getUserOrders(): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.baseUrl}/orders/get-user-orders`, {
      headers: {
        Authorization: `User ${this.token}`,
      },
    });
  }
}
