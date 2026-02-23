import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, throwError, tap } from "rxjs";
import { LoginRequest } from "../../interfaces/login-request.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private http = inject(HttpClient);
  
  private apiUrl = 'http://localhost:4200/auth';
  
  constructor() {}

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((userData) => {
        console.log('Usuario logueado:', userData);
        sessionStorage.setItem('token', userData.token);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse){
    if (error.status === 0) {
      console.error('Error de red:', error.error);
    } else {
      console.error(`Backend retornó código ${error.status}, cuerpo:`, error.error);
    }
    return throwError(() => Error('Algo fallo en la autenticacion.'));
  }
}