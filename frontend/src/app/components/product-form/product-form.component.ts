import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  productForm: FormGroup;
  error: string = '';

  constructor(private fb: FormBuilder, private productsService: ProductsService) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      destacado: [false]
    });
  }

  onSubmit() {

    if (this.productForm.invalid) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }

    this.productsService.addProduct(this.productForm.value).subscribe(
      response => {
        alert('Producto creado con éxito');
        this.productForm.reset();
        this.error = '';
      },
      err => {
        this.error = 'Error al crear el producto';
      }
    );
  }
}
