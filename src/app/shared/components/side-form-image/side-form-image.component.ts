import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-form-image',
  imports: [],
  templateUrl: './side-form-image.component.html',
  styleUrl: './side-form-image.component.css'
})
export class SideFormImageComponent {
@Input({'required': true}) img!: string;
}
