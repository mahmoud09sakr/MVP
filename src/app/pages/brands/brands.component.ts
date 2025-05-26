import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { RouterLink } from '@angular/router';
interface Brand {
  _id: string
  logo: string
  isDeleted: boolean
  deletedAt: any
  deletedBy: any
  createdAt: string
  updatedAt: string
  __v: number
  image:String
}

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
  brandsList:Brand[]=[]
constructor(private brands:BrandsService){

}
  ngOnInit(): void {
    this.brands.getAllBrands().subscribe({
      next:(res)=>{
        this.brandsList=res.brands
        
      }
    })
  }
}
