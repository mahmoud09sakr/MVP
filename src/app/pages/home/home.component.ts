import { ProductCardComponent } from './../../shared components/product-card/product-card.component';
import { CartService } from './../../core/services/cart.service';
import { ProductsService } from './../../core/services/products.service';
import { BrandsService } from './../../core/services/brands.service';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Brand } from '../../core/interfaces/brand';
import { CommonModule, CurrencyPipe, isPlatformBrowser, SlicePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { WishListService } from '../../core/services/wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { CarouselModule } from 'primeng/carousel';
import { ToastModule } from 'primeng/toast';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BannerSliderComponent } from '../../shared components/banner-slider/banner-slider.component';
import {  GalleriaModule } from 'primeng/galleria';
import { GalleriaComponent } from "../../shared/galleria/galleria.component";
import { TestsComponent } from "../../shared/tests/tests.component";
import { Blogs } from '../../core/interfaces/blogs';
import { BlogsService } from '../../core/services/blogs.service';


@Component({
  selector: 'app-home',
  imports: [
  GalleriaModule,

    TabsModule,
    ButtonModule,
    CommonModule,
    RouterLink,
    // TranslatePipe,
    ToastModule, ButtonModule,
    Dialog, InputTextModule, FormsModule, SearchPipe,
    RouterLink,
    ProductCardComponent,
    CarouselModule,
    BannerSliderComponent,
    GalleriaComponent,
    TestsComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  @ViewChild('carouselContainer') carouselRef!: ElementRef;
  @ViewChild('slider', { static: false }) slider!: ElementRef;
  images:string[] = ["/images/home banner 2 (1).png",
    "/images/home banner 2 (2).png"];
    private PLATFORM_ID = inject(PLATFORM_ID)
isDarkMode(): boolean {
  if(isPlatformBrowser(this.PLATFORM_ID)){
    return document.documentElement.classList.contains('dark');
  }
  return false
}



  

    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 4
        }
      },
      nav: true
    }
  
  currentIndex = 0;
  brandsList: Brand[] = [];
  productsList: any[] = [];
  currentLang = 'en';
  selectedTab = signal(0);
  tabs: any;

  // responsiveOptions = [
  //   {
  //     breakpoint: '1280px',
  //     numVisible: 5,
  //     numScroll: 1,
  //   },
  //   {
  //     breakpoint: '1024px',
  //     numVisible: 4,
  //     numScroll: 1,
  //   },
  //   {
  //     breakpoint: '768px',
  //     numVisible: 3,
  //     numScroll: 1,
  //   },
  //   {
  //     breakpoint: '560px',
  //     numVisible: 2,
  //     numScroll: 1,
  //   },
  // ];
  blogsResponsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  // blogs = [
  //   {
  //     image: 'images/pexels-albinberlin-919073 1.png',
  //     title: 'نموذج لوريم إيبسوم',
  //     description:
  //       'لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه … بروشور او فلاير على سبيل المثال … او نماذج مواقع انترنتلوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه … بروشور او فلاير على سبيل المثال ….....',
  //   },
  //   {
  //     image: 'images/pexels-mikebirdy-120049 1.png',
  //     title: 'نموذج لوريم إيبسوم',
  //     description:
  //       'لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه … بروشور او فلاير على سبيل المثال … او نماذج مواقع انترنتلوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه … بروشور او فلاير على سبيل المثال ….....',
  //   },
  //   {
  //     image: 'images/pexels-albinberlin-919073 1.png',
  //     title: 'نموذج لوريم إيبسوم',
  //     description:
  //       'لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه … بروشور او فلاير على سبيل المثال … او نماذج مواقع انترنتلوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه … بروشور او فلاير على سبيل المثال ….....',
  //   },
  //   {
  //     image: 'images/pexels-mikebirdy-120049 1.png',
  //     title: 'نموذج لوريم إيبسوم',
  //     description:
  //       'لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه … بروشور او فلاير على سبيل المثال … او نماذج مواقع انترنتلوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه … بروشور او فلاير على سبيل المثال ….....',
  //   },
  //   {
  //     image: 'images/pexels-albinberlin-919073 1.png',
  //     title: 'نموذج لوريم إيبسوم',
  //     description:
  //       'لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه … بروشور او فلاير على سبيل المثال … او نماذج مواقع انترنتلوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه … بروشور او فلاير على سبيل المثال ….....',
  //   },
  //   {
  //     image: 'images/pexels-mikebirdy-120049 1.png',
  //     title: 'نموذج لوريم إيبسوم',
  //     description:
  //       'لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه … بروشور او فلاير على سبيل المثال … او نماذج مواقع انترنتلوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه … بروشور او فلاير على سبيل المثال ….....',
  //   },
  // ];

  blogs!: Blogs[];

  getBlogs() {
    this._blogsService.getBlogs().subscribe({
      next: (data:any) =>{
        console.log(data ,"mahmoudnskar ");
        
        this.blogs = data.blogs;
      },
      error: (err) => {
        console.log(err);
      },

    })
  }

  constructor(
    private _blogsService:BlogsService,

    private BrandsService: BrandsService,
    private ProductsService: ProductsService,
    private CartService: CartService,
    private wishList: WishListService,
    private toastr: ToastrService,
    private myTranslate: MyTranslateService,
    private route :Router
  ) {
    this.myTranslate.lang.subscribe((res) => {
      this.currentLang = res;
    });
  }

  baners:string[]=['images/pexels-pashal-337909 1.png','images/pexels-pashal-337909 1.png','images/pexels-pashal-337909 1.png','images/pexels-pashal-337909 1.png','images/pexels-pashal-337909 1.png']
  ngOnInit(): void {

    this.getBlogs()

    this.getWidths()
    this.getBrands(),
    this.getProducts();
    this.tabs = [
      {
        title: 'عروض لفترة محدودة',
        value: 0,
        products: this.productsList,
      },
      {
        title: 'الاكثر مبيعا',
        value: 1,
        products: this.productsList,
      },
      {
        title: 'الاقل سعرا',
        value: 2,
        products: this.productsList,
      },
    ];
  }

  getBrands() {
    this.BrandsService.getAllBrands().subscribe({
      next: (res) => {
      
        this.brandsList = res.brands;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getProducts() {
    this.ProductsService.getAllProducts().subscribe({
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

  parseDescription(description: string): { en: string; ar: string } {
    try {
      return JSON.parse(description);
    } catch (error) {
      return { en: description, ar: description }; // Fallback: same text for both languages
    }
  }



  showSuccess(msg: string) {
    this.toastr.success(msg, 'Premium Tires');
  }

  showError(msg: string) {
    this.toastr.error(msg, 'Premium Tires');
  }
  addToWishlist(productId: string) {
    this.wishList.addToWishList(productId).subscribe({
      next: (res) => {
      
        this.wishList.counter.set(res.wishList.length);
        this.showSuccess('product add successfully to your whish list');
      },
      error: (err) => {
        console.log(err);
        this.showError(err.error.err);
      },
    });
  }

  products = [
    {
      image: 'images/fbe2d7da-a3ed-4b6f-a814-7d2f408048dc 1.png',
      name: 'HANKOOK',
      description: '122 / 65 R 852',
      price: 1240,
    },
    {
      image: 'images/fbe2d7da-a3ed-4b6f-a814-7d2f408048dc 1.png',
      name: 'HANKOOK',
      description: '122 / 65 R 852',
      price: 1240,
    },
    {
      image: 'images/fbe2d7da-a3ed-4b6f-a814-7d2f408048dc 1.png',
      name: 'HANKOOK',
      description: '122 / 65 R 852',
      price: 1240,
    },
    {
      image: 'images/fbe2d7da-a3ed-4b6f-a814-7d2f408048dc 1.png',
      name: 'HANKOOK',
      description: '122 / 65 R 852',
      price: 1240,
    },
    {
      image: 'images/fbe2d7da-a3ed-4b6f-a814-7d2f408048dc 1.png',
      name: 'HANKOOK',
      description: '122 / 65 R 852',
      price: 1240,
    },
    {
      image: 'images/fbe2d7da-a3ed-4b6f-a814-7d2f408048dc 1.png',
      name: 'HANKOOK',
      description: '122 / 65 R 852',
      price: 1240,
    },
    {
      image: 'images/fbe2d7da-a3ed-4b6f-a814-7d2f408048dc 1.png',
      name: 'HANKOOK',
      description: '122 / 65 R 852',
      price: 1240,
    },
    {
      image: 'images/fbe2d7da-a3ed-4b6f-a814-7d2f408048dc 1.png',
      name: 'HANKOOK',
      description: '122 / 65 R 852',
      price: 1240,
    },
    {
      image: 'images/fbe2d7da-a3ed-4b6f-a814-7d2f408048dc 1.png',
      name: 'HANKOOK',
      description: '122 / 65 R 852',
      price: 1240,
    },
    {
      image: 'images/fbe2d7da-a3ed-4b6f-a814-7d2f408048dc 1.png',
      name: 'HANKOOK',
      description: '122 / 65 R 852',
      price: 1240,
    },
    {
      image: 'images/fbe2d7da-a3ed-4b6f-a814-7d2f408048dc 1.png',
      name: 'HANKOOK',
      description: '122 / 65 R 852',
      price: 1240,
    },
    {
      image: 'images/fbe2d7da-a3ed-4b6f-a814-7d2f408048dc 1.png',
      name: 'HANKOOK',
      description: '122 / 65 R 852',
      price: 1240,
    },
    {
      image: 'images/fbe2d7da-a3ed-4b6f-a814-7d2f408048dc 1.png',
      name: 'HANKOOK',
      description: '122 / 65 R 852',
      price: 1240,
    },
  ];

  scrollLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.scrollToCurrentIndex();
    }
  }

  scrollRight() {
    if (this.currentIndex < this.products.length - 1) {
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

  scrollCarousel(direction: 'left' | 'right') {
    if (this.carouselRef) {
      const container = this.carouselRef.nativeElement;
      const scrollAmount = 350;

      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    } 
  }

step=1
  visible: boolean = false;
widths = []
heights =[];
lastSizes = [];


searchTerm: string = '';
selectedWidth= 0
selectedHeight=0
selectedSize=0

  showDialog() {
      this.visible = true;
  }
  updateSearchTerm() {
    this.searchTerm = this.searchTerm.replace(/[^0-9]/g, '').slice(0, 2);
  }

  selectWidth(width:any){
    this.selectedWidth=width
    this.ProductsService.getHeights(this.selectedWidth).subscribe({
      next:(res)=>{
      
        this.heights=res.availableDimensions.height
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
    this.step=2

    
  }
  selectHeight(height:any){
    this.selectedHeight=height
    
    this.ProductsService.getDiameter(this.selectedWidth,this.selectedHeight).subscribe({
      next:(res)=>{
      
        this.lastSizes=res.availableDimensions.diameter

        
      },error:(err)=>{
        console.log(err);
        
      }
    })
    this.step=3    
  }

  selectSize(size:any){
    this.selectedSize=size
    this.route.navigate(['/shop'], {
      queryParams: {width:this.selectedWidth,height:this.selectedHeight,diameter:this.selectedSize}
    });
    // this.ProductsService.getProductByTireDimentions(this.selectedWidth,this.selectedHeight,this.selectedSize).subscribe({
    //   next:(res)=>{
    //   
        
    //   },
    //   error:(err)=>{
    //     console.log(err);
        
    //   }
    // })
    this.step=1
    this.visible=false

    
  }



  getWidths(){
this.ProductsService.getWidths().subscribe({
  next:(res)=>{
    this.widths=res.availableDimensions.width
    
  },error:(err)=>{
    console.log(err);
    
  }
})
  }
}
