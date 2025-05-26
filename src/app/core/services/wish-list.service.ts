import { HttpClient } from '@angular/common/http';
import {
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  baseUrl: string = environment.baseUrl;
  token = '';
  counter: WritableSignal<number> = signal(0);
  id = inject(PLATFORM_ID);
  userData!:any

  constructor(private http: HttpClient) {
    
  }
  getWishList(): Observable<any> {
    if(isPlatformBrowser(this.id)){

      this.token = localStorage.getItem('userToken') as string;
      this.userData=localStorage.getItem('userData')
    }
    return this.http.get(
      `${this.baseUrl}/wishlist`,

      {
        headers: {
          Authorization: `${JSON.parse(this.userData).role} ${this.token}`,
        }
      }
    );
  }
  addToWishList(productId: string): Observable<any> {

    if(isPlatformBrowser(this.id)){

      this.token = localStorage.getItem('userToken') as string;
      this.userData=localStorage.getItem('userData')
    }
    return this.http.patch(
      `${this.baseUrl}/wishlist`,
      {
        productId: `${productId}`,
      },
      {
        headers: {
          Authorization: `${JSON.parse(this.userData).role} ${this.token}`,
        },
      }
    );
  }

  deleteProductFrommWishList(productId: string): Observable<any> {


    if(isPlatformBrowser(this.id)){

      this.token = localStorage.getItem('userToken') as string;
      this.userData=localStorage.getItem('userData')
    }
    return this.http.delete(`${this.baseUrl}/wishlist/${productId}`, {
      headers: {
        Authorization: `${JSON.parse(this.userData).role} ${this.token}`,
      },
    });
  }
}
