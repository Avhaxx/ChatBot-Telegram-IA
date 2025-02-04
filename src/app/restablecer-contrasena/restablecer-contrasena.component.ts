import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-restablecer-contrasena',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './restablecer-contrasena.component.html',
  styleUrls: ['./restablecer-contrasena.component.css']
})
export class RestablecerContrasenaComponent {
  new_password: string = '';
  token: string = '';
  mensajeEnviado: boolean = false;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  restablecerContrasena() {
    this.authService.restablecerContrasena(this.token, this.new_password).subscribe(
      response => {
        this.mensajeEnviado = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000); // Redirigir al login después de 3 segundos
      },
      error => {
        console.error('Error al restablecer la contraseña', error);
      }
    );
  }
}