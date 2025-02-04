import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent {
  email: string = '';
  mensajeEnviado: boolean = false;

  constructor(private authService: AuthService) {}

  recuperarContrasena() {
    this.authService.recuperarContrasena(this.email).subscribe(
      response => {
        this.mensajeEnviado = true;
      },
      error => {
        this.mensajeEnviado = true;
      }
    );
  }
}