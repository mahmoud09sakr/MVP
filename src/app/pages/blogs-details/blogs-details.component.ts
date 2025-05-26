import { Component, inject, OnInit } from '@angular/core';
import { BlogsService } from '../../core/services/blogs.service';
import { ActivatedRoute } from '@angular/router';
import { Blogs } from '../../core/interfaces/blogs';

@Component({
  selector: 'app-blogs-details',
  imports: [],
  templateUrl: './blogs-details.component.html',
  styleUrl: './blogs-details.component.css'
})
export class BlogsDetailsComponent implements OnInit {
  _BlogService=inject(BlogsService)
    _ActivatedRoute=inject(ActivatedRoute)

  blogs!:Blogs ;

ngOnInit(): void {
  this.getId()
}


  blog(id:string):void{
    this._BlogService.getBlogById(id).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.blogs =res.blog
        

      }
    })
  }

  getId(){
    this._ActivatedRoute.paramMap.subscribe({
      next:(res:any)=>{
        this.blog(res?.params?.id);
        
      }
    })
  }
}
