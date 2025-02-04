import { Component,OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,  // <--- Asegúrate de que 'standalone' sea true
  imports: [FormsModule, RouterModule, CommonModule], // <--- Importaciones necesarias
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';
  showError: boolean = false;
  showLoading: boolean = false;
  showSuccess: boolean = false;
      imagenes = ['foto1.jpg', 'icono2.jpg', 'foto3.jpg'];
      imagenActual = 1;
      ngOnInit() {
        setInterval(() => {
          this.imagenActual = (this.imagenActual + 1) % this.imagenes.length;
        }, 3000); // Cambia la imagen cada 3 segundos
      }
    
  constructor(private http: HttpClient,private authService: AuthService, private router: Router) {}

  register() {
    this.showLoading = true;
    this.authService.register(this.username, this.email, this.password).subscribe(
      response => {
        console.log('Registro exitoso', response);
        this.showLoading = false;
        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false;
          this.router.navigate(['/login']);
        }, 3000); // Mostrar el mensaje de éxito durante 3 segundos
      },
      error => {
        console.error('Error en el registro', error);
        this.showLoading = false;
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 3000); // Ocultar el mensaje de error después de 3 segundos
      }
    );
  }
}