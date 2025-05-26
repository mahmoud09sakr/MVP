import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [ RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  currentLang: string = 'ar';
 constructor(
    private myTranslate: MyTranslateService
  ) {
    this.myTranslate.lang.subscribe((res) => {
      this.currentLang = res;
    });
  }
}
