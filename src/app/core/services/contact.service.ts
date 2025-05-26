import { inject, Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl: string = environment.baseUrl;
  private http =inject(HttpClient);
constructor() { }
  sendMessage(form:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/direct-messages/add-message`, form)
  }
}
