import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
interface LoginResponse {
  message: string;
  username: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  showSuccess: boolean = false;
  email: string = '';
  password: string = '';
  showError: boolean = false;
  showLoading: boolean = false;
  formData = {
    email: '',
    password: ''
  };
  imagenes = ['foto1.jpg', 'icono2.jpg', 'foto3.jpg'];
  imagenActual = 1;
  ngOnInit() {
    setInterval(() => {
      this.imagenActual = (this.imagenActual + 1) % this.imagenes.length;
    }, 3000); // Cambia la imagen cada 3 segundos
  }

  constructor(private http: HttpClient,private authService: AuthService, private router: Router) {}


  login() {
    this.showLoading = true;
    console.log("Email antes de enviar:", this.formData.email);
    console.log("Contraseña antes de enviar:", this.formData.password);
    this.authService.login(this.formData.email, this.formData.password).subscribe(
    response => {
      console.log('Inicio de sesión exitoso', response);
      this.showLoading = false;
      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
        this.router.navigate(['/dashboard']);
      }, 3000); // Mostrar el mensaje de éxito durante 3 segundos
    },
    error => {
      console.error('Error en el inicio de sesión', error);
      this.showLoading = false;
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 3000); // Ocultar el mensaje de error después de 3 segundos
    }
  );
  }

}