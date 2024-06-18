import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products/products.service';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [ CommonModule, CarouselModule ],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css'
})
export class FeaturedProductsComponent implements OnInit {
  featuredProducts: any[] = [];

  constructor(private productsService: ProductsService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.productsService.getFeaturedProducts().subscribe(
      (data) => {
        this.featuredProducts = data;
        this.cdRef.detectChanges(); // Notificar a Angular que el contenido ha cambiado
      },
      (error) => {
        console.error('Error al obtener los productos destacados', error);
      }
    );
  }
}
