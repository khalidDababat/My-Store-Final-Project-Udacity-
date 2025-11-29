import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cartItems: CartItem[] = [];

    constructor() { }

    addToCart(product: Product, quantity: number): void {
        const existingItem = this.cartItems.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cartItems.push({ ...product, quantity });
        }
        alert(`${product.name} added to cart!`);
    }

    getCartItems(): CartItem[] {
        return this.cartItems;
    }

    removeFromCart(item: CartItem): void {
        this.cartItems = this.cartItems.filter(i => i.id !== item.id);
        alert(`${item.name} removed from cart!`);
    }

    clearCart(): void {
        this.cartItems = [];
    }

    calculateTotal(): number {
        return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }
}
