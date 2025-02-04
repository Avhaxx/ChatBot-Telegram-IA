import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes'; // Importa tus rutas
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa para formularios
import { HttpClientModule } from '@angular/common/http'; // Para peticiones HTTP


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(RouterModule.forRoot(routes)), // Configura el enrutamiento
        importProvidersFrom(FormsModule),  // Importa FormsModule para formularios template-driven
        importProvidersFrom(ReactiveFormsModule), // Importa ReactiveFormsModule para formularios reactivos (opcional, pero recomendado)
        importProvidersFrom(HttpClientModule)  // Importa HttpClientModule para peticiones HTTP
    ]
})
  .catch(err => console.error(err));