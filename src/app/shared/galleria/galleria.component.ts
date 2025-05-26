import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-galleria',
  imports: [GalleriaModule],
  templateUrl: './galleria.component.html',
  styleUrl: './galleria.component.css'
})
export class GalleriaComponent {
  images:string[] = ["/images/home banner 2 (1).png",
    "/images/home banner 2 (2).png"];

    responsiveOptions: any[] = [
       
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];
}
