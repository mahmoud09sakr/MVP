import { isPlatformBrowser, NgClass} from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import {  Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AsideProfileNavbarComponent } from "./components/aside-profile-navbar/aside-profile-navbar.component";

@Component({
  selector: 'app-profile',
  imports: [
    ButtonModule,
    RouterOutlet,
    AsideProfileNavbarComponent,
    NgClass
],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  userData:any
  PLATFORM_ID = inject(PLATFORM_ID)
  showSidebar = false;

  constructor(private auth: AuthService, private router: Router , private activeRoute: ActivatedRoute ){}

  ngOnInit(): void {
    if(isPlatformBrowser(this.PLATFORM_ID)){
   
      this.userData=JSON.parse(localStorage.getItem('userData') as string);
          }
    console.log(this.userData, "Dataaaaaaaa");
  }

  logout(){
    console.log('logout');
    
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');

    }
    this.router.navigate(['/home'])
  
  }
  openSidebar() { 
    this.showSidebar = !this.showSidebar
  }
}
