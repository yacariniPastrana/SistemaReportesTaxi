import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoginRequest } from '../../interfaces/login-request.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  errorMessage: string = '';

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials: LoginRequest = this.loginForm.value as LoginRequest;

      this.authService.login(credentials).subscribe({
        next: (userData) => {
          console.log('Login exitoso');
          this.router.navigate(['/dashboard']);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      alert('Por favor complete los campos');
    }
  }
  get username() { return this.loginForm.get('username');}
  get password() { return this.loginForm.get('password');}
}
