import type { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { MyTranslateService } from '../services/my-translate.service';
import { isPlatformBrowser } from '@angular/common';

export const langHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  const _id=inject(PLATFORM_ID)
  if(isPlatformBrowser(_id)){
    // localStorage.getItem('lang')
    req.headers.set('lang', localStorage.getItem('lang') || 'ar');
  }
  
  return next(req);
};
