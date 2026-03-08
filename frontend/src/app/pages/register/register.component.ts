import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    correo: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]],
    rol: ['', [Validators.required]]
  });

  mensajeError: string = '';
  mensajeExito: string = '';

  onSubmit() {
    if (this.registerForm.valid) {
      this.mensajeError = '';
      this.mensajeExito = '';

      const nuevoUsuario = {
        nombre: this.registerForm.value.nombre || '',
        correo: this.registerForm.value.correo || '',
        contrasena: this.registerForm.value.contrasena || '',
        rol: this.registerForm.value.rol || ''
      };

      this.authService.register(nuevoUsuario).subscribe({
        next: (respuesta: any) => {
          console.log('Registro exitoso:', respuesta);
          this.mensajeExito = '¡Usuario registrado con exito!';

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (errorHttp: any) => {
          console.error('Error en registro:', errorHttp);
          if (errorHttp.error && errorHttp.error.mensaje) {
            this.mensajeError = errorHttp.error.mensaje;
          } else {
            this.mensajeError = 'Error de conexion con el servidor.';
          }
        }
      });
  } else {
    this.registerForm.markAllAsTouched();
  }
}

irALogin() {
    this.router.navigate(['/login']);
  }

  get nombre() { return this.registerForm.get('nombre'); }
  get correo() { return this.registerForm.get('correo'); }
  get contrasena() { return this.registerForm.get('contrasena'); }
  get rol() { return this.registerForm.get('rol'); }
}
