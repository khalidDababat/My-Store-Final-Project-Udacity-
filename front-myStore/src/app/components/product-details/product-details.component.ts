import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
    product: Product | undefined;
    quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    selectedQuantity: number = 1;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.productService.getProduct(id).subscribe(product => {
            this.product = product;
        });
    }

    addToCart(): void {
        if (this.product) {
            this.cartService.addToCart(this.product, Number(this.selectedQuantity));
        }
    }
}
