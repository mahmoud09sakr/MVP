import {Component, EventEmitter, inject, Input, OnInit, Output, PLATFORM_ID, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CheckoutService} from '../../core/services/checkout.service';
import {ToastrService} from 'ngx-toastr';
import {Dialog} from 'primeng/dialog';
import {RadioButton} from 'primeng/radiobutton';
import { TranslatePipe } from '@ngx-translate/core';
import {isPlatformBrowser, JsonPipe, NgClass} from '@angular/common';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { InputErrorComponent } from "../../shared/components/input-error/input-error.component";

@Component({
  selector: 'app-fast-pay-dialog',
  imports: [
    Dialog,
    RadioButton,
    ReactiveFormsModule,
    // TranslateApiPipe,
    FormsModule,
    TranslatePipe,
    NgClass,
    // JsonPipe,
    InputErrorComponent
],
  templateUrl: './fast-pay-dialog.component.html',
  styleUrl: './fast-pay-dialog.component.css'
})
export class FastPayDialogComponent implements OnInit {
  @Input()productId!: string;
  @Input() quantity!:number;
  @Input()visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  lang!: string  ;
  shippingType: string = 'delivery';

  addressForm: FormGroup = new FormGroup({
    street: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    state: new FormControl(null, [Validators.required]),
    postalCode: new FormControl(null, [Validators.required,Validators.pattern('[0-9]{5,}')]),
    country: new FormControl(null, [Validators.required]),
  });
  private _checkoutService = inject(CheckoutService)
  private _toastrService=inject(ToastrService)
  private _PLATFORM_ID=inject(PLATFORM_ID)
  private _myTranslateService=inject(MyTranslateService)

  ngOnInit(): void {
    this._myTranslateService.lang.subscribe((res) => {
      this.lang = res;
    });
  }
  updateQuantity(term:string){
    console.log(term);

    if(term=='p'){
      this.quantity = this.quantity + 1
    }else{

      this.quantity = this.quantity - 1;
      if(this.quantity<=1){
        this.quantity = 1;
      }

    }
  }

  submit() {
    console.log(this.addressForm,this.shippingType)
    if (this.addressForm.valid && this.productId !== '') {

      this._checkoutService.onlineClickPay(this.productId, this.quantity , this.shippingType , this.addressForm.value).subscribe({
        next: (res:any) => {
          console.log(res);
          this._toastrService.success(`Your Order Has Been Created Successfully !!`)
          if (isPlatformBrowser(this._PLATFORM_ID)) {
            window.location.assign(res.url)

          }
          this.addressForm.reset();
          this.closeDialog();
        },
        error: (err: any) => {
          console.log(err);

          this._toastrService.error('something went wrong try again later.')
        },
        complete: () => {}
      })
    }else {

      this.addressForm.markAllAsTouched()
      this._toastrService.error('All fields are required')

    }
  }
  closeDialog(){
    this.visible = false;
    this.visibleChange.emit(false)
    this.addressForm.reset()
  }
}
