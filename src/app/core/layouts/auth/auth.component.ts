import { RegisterComponent } from './../../../pages/Auth/register/register.component';
import { Component, Input } from '@angular/core';
import { NavbarComponent } from '../../../shared components/navbar/navbar.component';
import { FooterComponent } from '../../../shared components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../../../pages/Auth/login/login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {

}
