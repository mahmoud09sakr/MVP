import { MyTranslateService } from './../../core/services/my-translate.service';
import {
  Component,
  ElementRef,
  inject,
  NgZone,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewChild,
  ViewEncapsulation,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { CurrencyPipe, isPlatformBrowser, JsonPipe, NgFor } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductCardComponent } from '../../shared components/product-card/product-card.component';
import { Dialog } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FastPayDialogService } from '../../core/services/fast-pay-dialog.service';
import { AuthDialogService } from '../../core/services/auth-dialog.service';

interface TireDetails {
  warranty: number;
  yearOfProduction: number;
  tireDrawType: string;
  tire_width: number;
  aspect_ratio: number;
  wheel_diameter: number;
  speed_rating: string;
  load_index: number;
  extra_load: boolean;
  tire_type: string;
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RatingModule,
    GalleriaModule,
    FormsModule,
    CarouselModule,
    ProductCardComponent,
    Dialog,
    DividerModule,
    // JsonPipe
  ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild('slider', { static: false }) slider!: ElementRef;

  currentIndex = 0;
  addedTire: any;
  customOptions = {
    loop: true,
    margin: 10,
    nav: false, // Disable Owl's own nav buttons
    dots: true,
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 },
    },
  };
  rating: number = 4.3;
  images: string[] = [];
  productId: string = '';
  productDetails: any = null;
  selectedImage: string = '';
  quantity: WritableSignal<number> = signal(1);
  currentLang: string = '';

  timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 1,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  private ngZone = inject(NgZone);

  private PLATFORM_ID = inject(PLATFORM_ID)
  dialogWidth: string = '80vw';

  constructor(
    private activatedRoute: ActivatedRoute,
    private products: ProductsService,
    private cart: CartService,
    private toastr: ToastrService,
    private myTranslate: MyTranslateService,
    private _fastPayDialogService: FastPayDialogService,
    private authDialogService : AuthDialogService,
  ) {
    this.myTranslate.lang.subscribe((res) => {
      this.currentLang = res;
    });
  }

  ngOnInit(): void {
    this.updateDialogWidth();
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      window.addEventListener('resize', () => this.updateDialogWidth());
    }
    this.getProducts();

    this.activatedRoute.paramMap.subscribe((p) => {
      this.productId = p.get('id') as string;
      if (this.productId) {
        this.getProductDetails();
      }
    });
    // Remove the countdown initialization from here
  }


  
private countdownInterval: any;

startCountdown() {
  if (this.countdownInterval) {
    clearInterval(this.countdownInterval);
  }
  
  this.countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const endTime = new Date(this.productDetails.discountEndTime).getTime();
    const distance = endTime - now;

    if (distance <= 0) {
      clearInterval(this.countdownInterval);
      this.timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return;
    }

    this.timeLeft = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
  }, 1000);
}
  productsList: any[] = [];

  getProducts() {
    this.products.getAllProducts().subscribe({
      next: (res) => {
        this.productsList = res.products.map((product: any) => ({
          ...product,
          name: this.parseJSON(product.name),
          description: this.parseJSON(product.description),
        }));
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  parseJSON(value: string): { en: string; ar: string } {
    try {
      return JSON.parse(value);
    } catch (error) {
      return { en: value, ar: value }; // Fallback: Use the same text for both languages
    }
  }

  tireDetails: TireDetails | null = null;

  getProductDetails() {
    this.products.getProductDetails(this.productId).subscribe({
      next: (res) => {

        console.log("res" , res);
        
        // Product details
        this.productDetails = res.products[0];
        this.addedTire = res.products[0].productDetails[0];
        console.log("added tire" , this.addedTire);
        

        // Set images array
        this.images = ["images/tiretire.jpg", "images/tiretire.jpg"];
        console.log("imaaages" , this.images);
        
        this.selectedImage = this.images[0];

        // Set tire specific details
        this.tireDetails = res.products[0].productDetails;

        // Set rating (you might want to calculate this from reviews)
        this.rating = 4.3;

        

        if (this.productDetails?.discountEndTime) {
          this.startCountdown();
        }
      },
      error: (err) => {
        this.showError('Failed to load product details');
      },
    });
  }

  parseDescription(description: string): { en: string; ar: string } {
    try {
      return JSON.parse(description);
    } catch (error) {
      return { en: description, ar: description };
    }
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }
  updateQuantity(term: string) {
    if (term === 'm' && this.quantity() > 1) {
      this.quantity.set(this.quantity() - 1);
    } else if (term === 'p') {
      this.quantity.set(this.quantity() + 1);
    }
  }

  addToCart(id: string) {
    if (this.quantity() > 0) {
      this.cart.AddProductToCart(id, this.quantity()).subscribe({
        next: (res:any) => {
          console.log(res);
          this.cart.counter.set(res.cart.cartItems.length);
          this.showSuccess('تمت اضافة المنتج الي عربة التسوق ')
        },
        error: (err) => {
          console.log(err);
          this.showError("حدث خطأ ما حاول مره اخري")
        },
      });
    }
  }

  showSuccess(msg: string) {
    this.toastr.success(msg, 'Premium Tires');
  }

  showError(msg: string) {
    this.toastr.error(msg, 'Premium Tires');
  }

  scrollLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.scrollToCurrentIndex();
    }
  }

  scrollRight() {
    if (this.currentIndex < this.productsList.length - 1) {
      this.currentIndex++;
      this.scrollToCurrentIndex();
    }
  }

  private scrollToCurrentIndex() {
    const slider = this.slider.nativeElement;
    const itemWidth = slider.children[0].offsetWidth;
    slider.scrollTo({
      left: this.currentIndex * itemWidth,
      behavior: 'smooth',
    });

    if (this.currentLang == 'ar') {
      slider.scrollTo({
        left: -this.currentIndex * itemWidth,
        behavior: 'smooth',
      });
    } else {
      slider.scrollTo({
        left: this.currentIndex * itemWidth,
        behavior: 'smooth',
      });
    }
  }

  visible: boolean = false;
  modal: string = '';
  showDialog(item: string) {
    this.modal = item;

    this.visible = true;
  }

  updateDialogWidth() {
    if (isPlatformBrowser(this.PLATFORM_ID)) {
    
    const w = window.innerWidth;
    if (w < 640) {
      this.dialogWidth = '90vw';
    } else if (w < 1024) {
      this.dialogWidth = '70vw';
    } else {
      this.dialogWidth = '40vw';
      }
    }
  }
  buyNow() {
    console.log('i am here');
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      let token = localStorage.getItem('userToken');
      console.log("token", token);
      

      if (!token) {
        // Use NgZone.run to properly handle the dialog opening
        this.ngZone.run(() => {
          this.authDialogService.openLoginDialog();
        });
        return;
      } else {

        this._fastPayDialogService.openDialog(this.productDetails._id, this.quantity())

      }

    }
  }
  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }






  


}
