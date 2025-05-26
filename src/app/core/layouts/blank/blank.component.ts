import { Component, inject, PLATFORM_ID } from '@angular/core';
import { NavbarComponent } from '../../../shared components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../shared components/footer/footer.component';
// import { initFlowbite } from 'flowbite';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { isPlatformBrowser } from '@angular/common';
// import { FlowbiteService } from '../../services/flowbite.service';
@Component({
  selector: 'app-blank',
  imports: [NavbarComponent, RouterOutlet, FooterComponent, NgxSpinnerModule],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.css',
})
export class BlankComponent {
  title = '2etarat';
  plat_id = inject(PLATFORM_ID);
  constructor(
    private Spinner: NgxSpinnerService
  ) {
    if (isPlatformBrowser(this.plat_id)) {
      localStorage.setItem('lang', 'en');
    }
  }

  ngOnInit(): void {
    // this.flowbiteService.loadFlowbite((flowbite) => {
    //   initFlowbite();
    // });

    this.Spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.Spinner.hide();
    }, 5000);
  }
}
