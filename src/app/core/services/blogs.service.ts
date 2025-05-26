import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

    _httpClient=inject(HttpClient)
  baseUrl: string = environment.baseUrl;
  constructor() { }

  getBlogById(id:string) {
    return this._httpClient.get(`${this.baseUrl}/blogs/get-blog-by-id/${id}`)
  }
  getBlogs() {
    return this._httpClient.get(`${this.baseUrl}/blogs/get-all-blogs`)
  }
}
