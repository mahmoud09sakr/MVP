import { Component, OnInit, PLATFORM_ID, inject, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthDialogService } from './core/services/auth-dialog.service';
import { AuthDialogComponent } from './shared components/auth-dialog/auth-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from './core/services/cart.service';
import { log } from 'node:console';
import { FastPayDialogService } from './core/services/fast-pay-dialog.service';
import { FastPayDialogComponent } from "./shared components/fast-pay-dialog/fast-pay-dialog.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthDialogComponent, FastPayDialogComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private PLATFORM_ID = inject(PLATFORM_ID);
  constructor(
    private translate: TranslateService,
    private authDialogService: AuthDialogService,
    private cookieService: CookieService,
    private cartService: CartService,
  ) {
    translate.addLangs(['ar', 'en']);

    // Get language from storage or use default
    const savedLang = this.getStoredLanguage() || 'ar';

    translate.setDefaultLang(savedLang);
    translate.use(savedLang);

    if (isPlatformBrowser(this.PLATFORM_ID)) {
      document.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = savedLang;
    }
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      if (!localStorage.getItem('sessionId')) {
        this.cartService.getSessionId().subscribe({
        next: (res: any) => {
          localStorage.setItem('sessionId', res.sessionId);
          // }
        },
        error: (err) => {
        }
      });
      }
      
    }
  }


  ngOnInit(): void {
    this.authDialogService.loginDialog$.subscribe(() => {
      this.showLoginDialog = true;
    });
    this._fastPayDialogService.dialog$.subscribe((data) => {
      this.showFastPayDialog = true;
      this.productId = data.productId;
      this.quantityForFastPayDialog = data.quantity
    })
    // if (isPlatformBrowser(this.PLATFORM_ID)) {
    //   this.cartService.getSessionId().subscribe({
    //     next: (res: any) => {
    //       localStorage.setItem('sessionId', res.sessionId);
    //       // }
    //     },
    //     error: (err) => {
    //     }
    //   });
    // }
  }

  showLoginDialog = false;
  showFastPayDialog = false;
  productId!: string;
  quantityForFastPayDialog!: number;
  private _fastPayDialogService: FastPayDialogService = inject(FastPayDialogService);

  private getStoredLanguage(): string | null {
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      // Try SessionStorage first
      const sessionLang = sessionStorage.getItem('language');
      if (sessionLang) {
        return sessionLang;
      }

      // Try Cookies as fallback
      const cookieLang = this.cookieService.get('language');
      if (cookieLang) {
        return cookieLang;
      }
    }
    return null;
  }


  private saveLanguagePreference(lang: string) {
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      // Save to both SessionStorage and Cookies
      sessionStorage.setItem('language', lang);
      this.cookieService.set('language', lang, 30);
    }
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    this.saveLanguagePreference(lang);
  }




}
