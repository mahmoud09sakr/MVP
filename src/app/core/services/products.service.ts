import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser, SlicePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl: string = environment.baseUrl;
  token = '';
  userData!:any
  PLATFORM_ID=inject(PLATFORM_ID)
  constructor(private http: HttpClient) {
    if(isPlatformBrowser(this.PLATFORM_ID)){

      this.token = localStorage.getItem('userToken') as string;
      this.userData=localStorage.getItem('userData')
    }
  }
  getAllProducts(): Observable<any> {

    return this.http.get(`${this.baseUrl}/products/tires`, {
      headers: {
        Authorization: `User ${this.token}`,
      },
    });
  }

  getFilteredProducts(queryParams:any): Observable<any> {
    
    return this.http.get(`https://2etaar-git-main-sakrs-projects.vercel.app/products/tires${queryParams}`, {
      headers: {
        Authorization: `User ${this.token}`,
      },
    });
  }

  getProductDetails(slug: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/products/get-all-products-by-slug/${slug}`,
      {
        headers: {
          Authorization: `User ${this.token}`,
        },
      }
    );
  }



  getAllProductsByBrandId(id:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/get-all-products-by-brandId/${id}`, {
      headers: {
        Authorization: `User ${this.token}`,
      },
    });
  }

  getWidths(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/filter-data`);
  }

  getHeights(width:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/filter-data?width=${width}`);
  }
  getDiameter(width:number,height:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/filter-data?width=${width}&height=${height}`)
  }
  getProductByTireDimentions(width:number,height:number,diameter:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/products/filter-data?width=${width}&height=${height}&diameter=${diameter}`)
  }

   comparisonList=[]
  compareProducts():Observable<any>{
    if(isPlatformBrowser(this.PLATFORM_ID)){
    this.comparisonList=JSON.parse(localStorage.getItem("comparisonList") as string).slice(0,4)
    }
    return this.http.post(`${this.baseUrl}/products/compare-by-ids`,{'productIds': this.comparisonList}
     )
  }
}
