import { platform } from 'os';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ProductsService } from './../../core/services/products.service';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [CommonModule, ButtonModule, RatingModule, FormsModule],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.css'
})
export class CompareComponent implements OnInit {
  comparisonList: any[] = [];
  rating: number = 0;

  constructor(private ProductsService: ProductsService) {}

  ngOnInit(): void {
    
    this.ProductsService.compareProducts().subscribe({
      next: (res) => {

        this.comparisonList = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  PLATFORM_ID=inject(PLATFORM_ID)
  removeFromComparison(id: string) {
    this.comparisonList = this.comparisonList.filter(p => p._id !== id);
    if(isPlatformBrowser(this.PLATFORM_ID)){

      localStorage.setItem('comparisonList', JSON.stringify(this.comparisonList));
    }
  }

  // addToCart(product: any) {
  //   console.log(product);
  // }

  getTireSize(name: string): string {
    // Match patterns like 280/50 R160
    const match = name.match(/(\d{3})\/(\d{2})\s*R(\d{2,3})/i);
    if (match) {
      const [_, width, profile, rim] = match;
      return `${width}/${profile}/${rim}`;
    }
    return '';
  }
}