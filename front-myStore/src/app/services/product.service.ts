import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private dataUrl = 'http://localhost:4000/products';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<any[]>(this.dataUrl).pipe(
            map(products => products.map(p => ({
                id: p.id,
                name: p.name,
                price: Number(p.price),
                url: `http://localhost:4000${p.image}`,
                description: p.description
            })))
        );
    }

    getProduct(id: number): Observable<Product | undefined> {
        return this.getProducts().pipe(
            map((products: Product[]) => products.find(p => p.id === id))
        );
    }
}
