import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  baseUrl: string = environment.baseUrl;
  token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzVlZjQ5MWZiYzRjZjQ4YzlkNDI4YyIsIm5hbWUiOiJSYWR3YSBUYWhhIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzQ0Mzg1NTkwfQ.lgXQTydMjtwczpO1aB2C07aXZyArmVCCcSFegmHAQic`;

  constructor(private http: HttpClient) {
    // const id = inject(PLATFORM_ID);
    // if (isPlatformBrowser(id)) {
    //   this.token = localStorage.getItem('userToken') as string;
    // }
  }
  getAllBrands(): Observable<any> {
    
    return this.http.get(`${this.baseUrl}/brands/get-all-brands`, {
      headers: {
        Authorization: `User ${this.token}`,
      },
    });
  }
}
