import { Component, OnInit ,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-producto',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent {
  productoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.productoForm = this.fb.group({
      nombre: [data.nombre, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\/\(\)\-]+$/)
      ]],
      descripcion: [data.descripcion, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\/\(\)\-]+$/)
      ]],
      precio: [data.precio, [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/)
      ]]
    });
  }
  ngOnInit() {
    // Inicializar el formulario con los datos del producto a editar
    this.productoForm.patchValue({
      nombre: this.data.producto.nombre,
      descripcion: this.data.producto.descripcion,
      precio: this.data.producto.precio
    });
  }
  get nombre() { return this.productoForm.get('nombre'); }

  get descripcion() { return this.productoForm.get('descripcion'); }

  get precio() { return this.productoForm.get('precio'); }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    if (this.productoForm.valid) {
      this.dialogRef.close(this.productoForm.value);
    }
  }
}