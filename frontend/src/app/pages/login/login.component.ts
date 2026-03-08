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
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required]]
  });

  errorMessage: string = '';

  onSubmit() {
    if (this.loginForm.valid) {
      const credencialesParaBackend: LoginRequest = {
        correo: this.loginForm.value.correo || "",
        contrasena: this.loginForm.value.contrasena || ""
      };

      this.errorMessage = "";

      this.authService.login(credencialesParaBackend).subscribe({
        next: (respuestaBackend) => {
          console.log("Login exitoso:", respuestaBackend);
          this.router.navigate(["/dashboard"]);
        },
        error: (errorHttp) => {
          console.error("Error en el login:", errorHttp);
          if (errorHttp.error && errorHttp.error.mensaje) {
            this.errorMessage = errorHttp.error.mensaje;
          } else {
            this.errorMessage = "Error de conexion con el servidor.";
          }
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      alert('Por favor complete los campos');
    }
  }

  irARegistro(){
    this.router.navigate(['/register']);
  }

  get correo() { return this.loginForm.get('correo');}
  get contrasena() { return this.loginForm.get('contrasena');}
}
