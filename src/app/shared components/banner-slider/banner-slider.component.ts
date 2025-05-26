import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MyTranslateService } from '../../core/services/my-translate.service';

@Component({
  selector: 'app-banner-slider',
  imports: [CommonModule],
  templateUrl: './banner-slider.component.html',
  styleUrl: './banner-slider.component.css'
})
export class BannerSliderComponent {
  currentLang = 'en';

  baners:string[]=['images/بنر 2.png','images/بنر 3.png','images/بنر 1.png','images/بنر 2.png','images/بنر 3.png','images/بنر 1.png']
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;  // Changed from carouselRef to carouselContainer

constructor(
  private myTranslate: MyTranslateService,
) {
  this.myTranslate.lang.subscribe((res) => {
    this.currentLang = res;
  });
}


  scrollCarousel(direction: string) {
    const container = this.carouselContainer.nativeElement;
    const scrollAmount = direction === 'left' ? -350 : 350;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}
