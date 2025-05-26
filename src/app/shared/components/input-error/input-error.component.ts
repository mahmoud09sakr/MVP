import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-input-error',
  imports: [TranslatePipe],
  templateUrl: './input-error.component.html',
  styleUrl: './input-error.component.css'
})
export class InputErrorComponent {
  @Input() controller!: any;
  @Input() customError: boolean | null = false;
  @Input() controllerName!: string;

  getErrorMessage() {
    let message: string | null = null;

    if (this.controller.errors) {

      this.controller.errors['required'] ? message = 'form.errorMessages.requiredField' : null;
      this.controller.errors['email'] ? (message = 'form.errorMessages.invalidEmail') : null;
      this.controller.errors['pattern'] && this.controllerName === 'phone' ? (message = 'form.errorMessages.invalidPhone' ) : null;
      this.controller.errors['pattern'] && this.controllerName === 'postalCode' ? (message = 'form.errorMessages.invalidZip' ) : null;
      this.controller.errors['pattern'] && this.controllerName === 'password' ? (message = 'form.errorMessages.invalidPassword' ) : null;
      this.controller.errors['minlength'] && this.controllerName === 'password' ? (message = 'form.errorMessages.invalidPassword' ) : null;
      

    }
    this.customError ? (message = 'form.errorMessages.invalidRePassword') : null;
    return message;
  }
}
