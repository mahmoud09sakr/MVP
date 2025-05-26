import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.baseUrl;
  userData!: any;
  isLoggedIn = signal(false);
  isLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);;
  id = inject(PLATFORM_ID);
  sessionId:string = ''
  constructor(private http: HttpClient, private router: Router) { 
    if(isPlatformBrowser(this.id)){
      this.sessionId= localStorage.getItem('sessionId') || '';

    }
  }

  signUp(form: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signUp`, form);
  }

  checkAuthStatus() {
    if (isPlatformBrowser(this.id)) {
      const token = localStorage.getItem('userToken');
      if (token) {
        const decoded = jwtDecode(token);
        this.userData.set(decoded);
        this.isLoggedIn.set(true);
      }
    }
  }

  Login(form: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, form,{
      headers:{
        'sessionid': this.sessionId
      }
    });
  }
  sendOTP(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/sendOTP`, formData);
  }
  ResetPassword(formData: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/auth/resetPassword`, formData);
  }
  updateUserData(formData: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/users/update-profile`, formData, {
      headers: {
        Authorization: `${JSON.parse(this.userData).role} ${localStorage.getItem('userToken')}`,
      },
    });
  }

  logOut() {

    if (isPlatformBrowser(this.id)) {
      localStorage.removeItem('userToken');
    }

    this.isLogin.next(false)
    this.isLoggedIn.set(false);
  }
  ;
  decodeToken(): void {
    if (isPlatformBrowser(this.id)) {
      const token = localStorage.getItem('userToken') as string;
      this.userData = jwtDecode(token);
    }
  }
}
