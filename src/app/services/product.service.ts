import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    { id: 1, name: 'Laptop', category: 'Electrónica', price: 1200, stock: 10, active: true },
    { id: 2, name: 'Mouse', category: 'Accesorios', price: 25, stock: 150, active: true },
    { id: 3, name: 'Teclado', category: 'Accesorios', price: 45, stock: 80, active: true },
    { id: 4, name: 'Monitor', category: 'Electrónica', price: 300, stock: 20, active: false },
    { id: 5, name: 'Impresora', category: 'Oficina', price: 200, stock: 15, active: true }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products).pipe(
      delay(800) // simulamos latencia real
    );
  }
}
