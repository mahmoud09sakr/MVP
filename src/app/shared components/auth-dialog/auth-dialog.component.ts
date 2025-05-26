import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from "primeng/dialog";
import { LoginComponent } from "../../pages/Auth/login/login.component";
import { RegisterComponent } from '../../pages/Auth/register/register.component';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from "../../pages/Auth/reset-password/reset-password.component";

@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  imports: [
    DialogModule,
    LoginComponent,
    RegisterComponent,
    CommonModule,
    ResetPasswordComponent
  ],
  templateUrl: './auth-dialog.component.html',
  styleUrl: './auth-dialog.component.css'
})
export class AuthDialogComponent implements OnInit {
  ngOnInit(): void {
    this.page= 'login';
  }
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  page: 'login' | 'register' | 'reset-password' = 'login';

  onHide() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.page = 'login';
  }
}
