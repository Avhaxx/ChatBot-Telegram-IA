import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { AddCategoriaComponent } from '../add-categoria/add-categoria.component';
import { AddProductoComponent } from '../add-producto/add-producto.component';
import { EditCategoriaComponent } from '../edit-categoria/edit-categoria.component';
import { EditProductoComponent } from '../edit-producto/edit-producto.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';






@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule,MatDialogModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  categorias: any[] = [];
  username: string | null = '';
  botActivo: boolean = false;

  constructor(private http: HttpClient,private authService: AuthService,public dialog: MatDialog) {}

  ngOnInit() {
    this.authService.getUserInfo().subscribe(
      (response) => {
          this.username = response.username;
          console.log("Nombre de usuario:", this.username);
      },
      (error) => {
          console.error("Error al obtener la información del usuario:", error);
        // Manejar el error, por ejemplo, redirigiendo al login
    }
  );
  // Recupera el nombre de usuario
  // Obtener las categorías y sus productos desde el backend
  this.obtenerCategoriasYProductos();
}
obtenerCategoriasYProductos() {

  this.http.get('http://127.0.0.1:5000/categorias_con_productos').subscribe(
    (data: any) => {
      this.categorias = data;
    },
    error => {
      console.error('Error al obtener las categorías y productos', error);
    }
  );

  
}


eliminarProducto(producto: any) {
  const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
    width: '400px',
    data: { nombre: producto.nombre },
    disableClose: true, // Deshabilitar el cierre del modal al hacer clic fuera de él
    hasBackdrop: true, // Asegurarse de que haya un fondo oscuro detrás del modal
    panelClass: 'custom-dialog-container'


  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.http.delete(`http://127.0.0.1:5000/productos/${producto.id}`).subscribe(
        () => {
          console.log('Producto eliminado con éxito');
          this.obtenerCategoriasYProductos(); // Actualizar la vista del dashboard
        },
        error => {
          console.error('Error al eliminar el producto', error);
        }
      );
    }
  });
}



toggleBot() {
  if (!this.botActivo) {
    this.http.get('http://127.0.0.1:5000/iniciar_bot').subscribe(
      () => {
        console.log('Chatbot iniciado');
        this.botActivo = true;
      },
      error => {
        console.error('Error al iniciar el chatbot', error);
      }
    );
  } else {
    // Aquí puedes agregar la lógica para detener el chatbot si es necesario
    console.log('Chatbot detenido');
    this.botActivo = false;
  }
}























addCategoria() {
  const dialogRef = this.dialog.open(AddCategoriaComponent, {
    width: '400px',
    disableClose: true, // Deshabilitar el cierre del modal al hacer clic fuera de él
    hasBackdrop: true, // Asegurarse de que haya un fondo oscuro detrás del modal
    panelClass: 'custom-dialog-container' // Clase personalizada para el contenedor del diálogo
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const nuevaCategoria = { nombre: result };
      this.http.post('http://127.0.0.1:5000/categorias', nuevaCategoria).subscribe(
        () => {
          console.log('Categoría añadida con éxito');
          this.obtenerCategoriasYProductos(); // Actualizar la vista del dashboard
        },
        error => {
          console.error('Error al añadir la categoría', error);
        }
      );
    }
  });
}




addModalProducto(categoria: any) {
  const dialogRef = this.dialog.open(AddProductoComponent, {
    width: '1000px',
    disableClose: true, // Deshabilitar el cierre del modal al hacer clic fuera de él
    hasBackdrop: true, // Asegurarse de que haya un fondo oscuro detrás del modal
    // Clase personalizada para el contenedor del diálogo
    data: { categoria_id: categoria.id } // Pasar el id de la categoría al modal
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const nuevoProducto = { ...result, categoria_id: categoria.id };
      this.http.post('http://127.0.0.1:5000/productos', nuevoProducto).subscribe(
        () => {
          console.log('Producto añadido con éxito');
          this.obtenerCategoriasYProductos(); // Actualizar la vista del dashboard
        },
        error => {
          console.error('Error al añadir el producto', error);
        }
      );
    }
  });
}
logout() {
  this.authService.logout();
}


editarModalProducto(producto: any) {
  const dialogRef = this.dialog.open(EditProductoComponent, {
    width: '600px',
    disableClose: true, // Deshabilitar el cierre del modal al hacer clic fuera de él
    hasBackdrop: true, // Asegurarse de que haya un fondo oscuro detrás del modal
    panelClass: 'custom-dialog-container', // Clase personalizada para el contenedor del diálogo
    data: { producto: producto } // Pasar el producto al modal
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const productoActualizado = { ...result, categoria_id: producto.categoria_id };
      this.http.put(`http://127.0.0.1:5000/productos/${producto.id}`, productoActualizado).subscribe(
        () => {
          console.log('Producto actualizado con éxito');
          this.obtenerCategoriasYProductos(); // Actualizar la vista del dashboard
        },
        error => {
          console.error('Error al actualizar el producto', error);
        }
      );
    }
  });
}

editarModalCategoria(categoria: any) {
  const dialogRef = this.dialog.open(EditCategoriaComponent, {
    width: '400px',
    disableClose: true, // Deshabilitar el cierre del modal al hacer clic fuera de él
    hasBackdrop: true, // Asegurarse de que haya un fondo oscuro detrás del modal
    panelClass: 'custom-dialog-container', // Clase personalizada para el contenedor del diálogo
    data: { nombre: categoria.nombre } // Pasar el nombre de la categoría al modal
  });

 
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const categoriaActualizada = { nombre: result };
      this.http.put(`http://127.0.0.1:5000/categorias/${categoria.id}`, categoriaActualizada).subscribe(
        () => {
          console.log('Categoría actualizada con éxito');
          // Actualizar la categoría en la lista sin cambiar el orden
          const index = this.categorias.findIndex(cat => cat.id === categoria.id);
          if (index !== -1) {
            this.categorias[index].nombre = result;
          }
        },
        error => {
          console.error('Error al actualizar la categoría', error);
        }
      );
    }
  });
}
}