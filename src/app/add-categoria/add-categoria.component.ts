import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-categoria',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent {
  nombreValue: string = '';
  categoriaForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddCategoriaComponent>,
  private fb: FormBuilder
  ) {

    this.categoriaForm = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/) // Solo letras, números y espacios
      ]]
    });

  }

  get nombre() {
    return this.categoriaForm.get('nombre');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    if (this.categoriaForm.valid) {
      this.dialogRef.close(this.categoriaForm.value.nombre);
    }
  }
}