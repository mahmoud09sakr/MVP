import { isPlatformBrowser } from '@angular/common';
import {
  inject,
  Injectable,
  PLATFORM_ID,
  RendererFactory2,
  signal,
  WritableSignal,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private renderer2 = inject(RendererFactory2).createRenderer(null, null);
  private platId = inject(PLATFORM_ID);
  lang: BehaviorSubject<string> = new BehaviorSubject('ar');

  constructor(public translate: TranslateService) {
    // Force Arabic language initialization
    this.translate.setDefaultLang('ar');
    this.translate.use('ar');
    this.lang.next('ar');

    if (isPlatformBrowser(this.platId)) {
      // Clear any existing language setting to force Arabic
      localStorage.removeItem('lang');
      localStorage.setItem('lang', 'ar');
    }
    
    this.changeDirection();
  }

  changeDirection() {
    if (isPlatformBrowser(this.platId)) {
      // Force RTL direction and Arabic language
      this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      this.renderer2.setAttribute(document.documentElement, 'lang', 'ar');
    }
  }

  changeLang(lang: string) {
    if (isPlatformBrowser(this.platId)) {
      localStorage.setItem('lang', lang);
    }

    this.translate.use(lang);
    this.lang.next(lang);
    this.changeDirection();
  }
  translateApi(msg: {as: string , en: string}){
    if(this.lang.value === 'ar'){
      return msg.as
    }
    return msg.en
  }
}
