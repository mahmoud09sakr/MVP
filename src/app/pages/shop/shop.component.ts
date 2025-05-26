import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderModule } from 'primeng/slider';
import { ProductsService } from '../../core/services/products.service';
import { HttpClient } from '@angular/common/http';
import { ProductCardComponent } from '../../shared components/product-card/product-card.component';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { BannerSliderComponent } from '../../shared components/banner-slider/banner-slider.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandsService } from '../../core/services/brands.service';

interface Brand {
  label: string;
  value: string;
}

interface Country {
  label: string;
  value: string;
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    CheckboxModule,
    SliderModule,
    ReactiveFormsModule,
    ProductCardComponent,
    BannerSliderComponent
  ],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShopComponent implements OnInit {
  currentLang = 'en';
  productsList = signal<any>([]);
  quantity = signal(1);
  filterApplied = signal(false); // New signal to track filter application

  filterForm!: FormGroup;
  priceRange: number[] = [0, 2000];
  selectedTab = 0;

  brandsList = [];
  countries: Country[] = [
    { label: 'ياباني', value: 'japan' },
    { label: 'كوري', value: 'korea' },
    { label: 'صيني', value: 'china' }
  ];

  widths: any[] = [];
  heights: any[] = [];
  diameters: any[] = [];
  selectedWidth: any;
  selectedHeight: any;
  selectedDiameter: any;

  yearOptions: any[] = [];
  warrantyOptions: any[] = [];
  tireDrawTypeOptions: string[] = [];
  speedRatingOptions: string[] = [];
  extraLoad: any[] = [];
  tireTypes: any[] = [];
  loadIndexes: any[] = [];

  baners: string[] = [
    'images/pexels-pashal-337909 1.png',
    'images/pexels-pashal-337909 1.png',
    'images/pexels-pashal-337909 1.png',
    'images/pexels-pashal-337909 1.png',
    'images/pexels-pashal-337909 1.png'
  ];

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder,
    private http: HttpClient,
    private myTranslate: MyTranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private brandsService: BrandsService
  ) {
    this.myTranslate.lang.subscribe((res) => {
      this.currentLang = res;
    });

    this.filterForm = this.fb.group({
      minPrice: [null],
      maxPrice: [null],
      tire_width: [null],
      aspect_ratio: [null],
      wheel_diameter: [null],
      tireDrawType: [null],
      yearOfProduction: [null],
      warranty: [null],
      speed_rating: [null],
      load_index: [null],
      extra_load: [null],
      tire_type: [null],
      brandId: [null],
      page: [null],
      limit: [null]
    });
  }

  ngOnInit() {
    this.getBrands();
    this.route.queryParams.subscribe((params) => {
      if (Object.keys(params).length > 0) {
        const mappedParams = this.mapQueryParamsToForm(params);
        this.filterForm.patchValue(mappedParams);
        this.applyFilters();
      } else {
        this.getProducts();
      }
    });
    this.getDimensions();
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.productsList.set(res.products);
        this.filterApplied.set(false); // Reset filterApplied on initial load
      },
      error: (err) => console.log(err)
    });
  }
  isDarkMode(): boolean {
  return document.documentElement.classList.contains('dark');
}

  getBrands() {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsList = res.brands;
      },
      error: (err) => console.log(err)
    });
  }

  getDimensions() {
    this.productsService.getWidths().subscribe({
      next: (res) => {
        this.widths = res.availableDimensions.width;
        this.heights = res.availableDimensions.height;
        this.diameters = res.availableDimensions.diameter;
        this.yearOptions = res.availableFilters.yearOfProduction;
        this.warrantyOptions = res.availableFilters.warranty;
        this.tireDrawTypeOptions = res.availableFilters.tireDrawType;
        this.speedRatingOptions = res.availableFilters.speed_rating;
        this.loadIndexes = res.availableFilters.load_index;
        this.extraLoad = res.availableFilters.extra_load;
        this.tireTypes = res.availableFilters.tire_type;
      },
      error: (err) => console.log(err)
    });
  }

  applyFilters() {
    const formValues = this.filterForm.value;
    const cleanedValues = Object.fromEntries(
      Object.entries(formValues).filter(
        ([_, value]) => value !== null && value !== ''
      )
    );

    // Update URL with query params
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: cleanedValues,
      queryParamsHandling: 'merge'
    });

    const queryParams = this.buildQueryParams(cleanedValues);
    this.productsService.getFilteredProducts(queryParams).subscribe({
      next: (res) => {
        this.productsList.set(res.products);
        this.filterApplied.set(true); // Set filterApplied to true when filters are applied
      },
      error: (err) => console.log(err)
    });
  }

  updatePriceRange() {
    this.filterForm.patchValue({
      minPrice: this.priceRange[0],
      maxPrice: this.priceRange[1]
    });
    this.applyFilters();
  }

  updateQuantity(term: string) {
    if (term === 'p') {
      this.quantity.update((val) => val + 1);
    } else if (term === 'm' && this.quantity() > 1) {
      this.quantity.update((val) => val - 1);
    }
  }

  resetFilters(event: Event) {
    event.preventDefault();
    this.filterForm.reset();
    this.priceRange = [0, 2000];
    this.selectedWidth = null;
    this.selectedHeight = null;
    this.selectedDiameter = null;
    this.selectedTireDrawType = '';
    this.selectedWarranty = '';
    this.selectedTire_type = '';
    this.selectedSpeedRating = '';
    this.selectedLoadIndex = '';
    this.selectedExtraLoad = '';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
    this.filterApplied.set(false); // Reset filterApplied on reset
    this.getProducts();
  }

  onWidthChange(value: string) {
    this.selectedWidth = value;
  }

  onHeightChange(value: string) {
    this.selectedHeight = value;
  }

  onRimSizeChange(value: string) {
    this.selectedDiameter = value;
  }

  buildQueryParams(formValues: any): string {
    const query = new URLSearchParams();
    for (const key in formValues) {
      if (formValues[key] != null && formValues[key] !== '') {
        query.append(key, formValues[key]);
      }
    }
    return `?${query.toString()}`;
  }

  private mapQueryParamsToForm(params: any): any {
    const keyMap: { [key: string]: string } = {
      width: 'tire_width',
      height: 'aspect_ratio',
      diameter: 'wheel_diameter',
      brand: 'brand',
      country: 'country',
      draw: 'tireDrawType',
      year: 'yearOfProduction',
      warranty: 'warranty',
      minPrice: 'minPrice',
      maxPrice: 'maxPrice',
      speedRating: 'speed_rating',
      loadIndex: 'load_index',
      tireType: 'tire_type'
    };

    const mapped: any = {};
    for (const key in params) {
      const formKey = keyMap[key] || key;
      mapped[formKey] = params[key];
    }

    return mapped;
  }

  onFilterChange() {
    this.applyFilters();
  }

  selectedTireDrawType = '';
  selectedWarranty = '';
  selectedTire_type = '';
  selectedSpeedRating = '';
  selectedLoadIndex = '';
  selectedExtraLoad = '';

  onTireDrawTypeChange(value: string) {
    this.selectedTireDrawType = value;
  }
  onWarrantyChange(value: string) {
    this.selectedWarranty = value;
  }
  onTire_typeChange(value: string) {
    this.selectedTire_type = value;
  }
  onspeedRatingChange(value: string) {
    this.selectedSpeedRating = value;
  }
  onLoadIndexchange(value: string) {
    this.selectedLoadIndex = value;
  }
  onExtraLoadChange(value: string) {
    this.selectedExtraLoad = value;
  }
}