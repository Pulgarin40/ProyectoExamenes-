import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:3000/auth'; 
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private http: HttpClient, 
    private router: Router, 
    @Inject(PLATFORM_ID) private platformId: Object // Inyección para verificar el entorno
  ) {}

  get isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Verificar si hay token al iniciar la app
  private hasToken(): boolean {
    return this.isLocalStorageAvailable() && !!localStorage.getItem('token');
  }

  private isLocalStorageAvailable(): boolean {
    // Verificar que estamos en un navegador
    if (!isPlatformBrowser(this.platformId)) {
      console.warn('localStorage no está soportado en este entorno.');
      return false;
    }
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.warn('localStorage no está disponible en este navegador.');
      return false;
    }
  }
  
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token && this.isLocalStorageAvailable()) {
          localStorage.setItem('token', response.token);
          this.isAuthenticatedSubject.next(true);
        }
      }),
      catchError(err => {
        console.error('Error en el login:', err);
        return of({ error: 'Error al iniciar sesión, por favor verifica tus credenciales.' });
      })
    );
  }

  register(user: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, user).pipe(
      catchError(err => {
        console.error('Error en el registro:', err);
        return of({ error: 'Error al registrar el usuario. Inténtalo de nuevo.' });
      })
    );
  }

  recoverPassword(email: string): Observable<any> {
    return this.http.post(`${this.authUrl}/recover-password`, { email }).pipe(
      catchError(err => {
        console.error('Error en recuperación de contraseña:', err);
        return of(null);
      })
    );
  }

  logout() {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('token');
    }
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }
}
