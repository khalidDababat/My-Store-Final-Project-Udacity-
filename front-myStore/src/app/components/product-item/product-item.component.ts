import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product: Product | undefined;
  @Output() addedToCart = new EventEmitter<{ product: Product, quantity: number }>();

  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedQuantity: number = 1;

  constructor() { }

  addToCart(): void {
    if (this.product) {
      this.addedToCart.emit({ product: this.product, quantity: Number(this.selectedQuantity) });
    }
  }
}
