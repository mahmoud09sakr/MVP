import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthDialogService {

  constructor() { }
  private loginDialogTrigger = new Subject<void>();

  loginDialog$ = this.loginDialogTrigger.asObservable();

  openLoginDialog() {
    this.loginDialogTrigger.next(); // 👈 Broadcast trigger
  }
}
