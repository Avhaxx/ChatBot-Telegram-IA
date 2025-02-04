import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { ProtectedComponent } from './protected/protected.component';
import { AuthGuard } from './services/auth.guard';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';
import { RestablecerContrasenaComponent } from './restablecer-contrasena/restablecer-contrasena.component';
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, // El LayoutComponent es el componente padre
    children: [ // Las rutas hijas se renderizarán dentro del LayoutComponent
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'recuperar-contrasena', component: RecuperarContrasenaComponent },
      { path: 'restablecer-contrasena', component: RestablecerContrasenaComponent },
      { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'login', pathMatch: 'full' } // Redirige a /login por defecto
    ]
  }
];