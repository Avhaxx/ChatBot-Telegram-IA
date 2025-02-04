import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        console.log('Token recibido:', response.access_token);
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('username', response.username);
        console.log('Token almacenado en localStorage:', localStorage.getItem('access_token'));
      })
    );
  }
  getUserInfo(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/user_info`, { headers });
  }
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  getProtectedData(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Enviando token en la solicitud:', token);
    return this.http.get<any>(`${this.apiUrl}/protected`, { headers });
  }

  recuperarContrasena(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/recuperar-contrasena`, { email });
  }

  restablecerContrasena(token: string, new_password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/restablecer-contrasena`, { token, new_password });
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, email, password }).pipe(
      tap(response => {
        console.log('Token recibido al registrar:', response.access_token);
        localStorage.setItem('access_token', response.access_token);
      })
    );
  }
}