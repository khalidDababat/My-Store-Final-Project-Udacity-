import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    cartItems: CartItem[] = [];
    total: number = 0;
    fullName: string = '';
    address: string = '';
    creditCard: string = '';

    constructor(private cartService: CartService, private router: Router) { }

    ngOnInit(): void {
        this.cartItems = this.cartService.getCartItems();
        this.calculateTotal();
    }

    calculateTotal(): void {
        this.total = this.cartService.calculateTotal();
    }

    removeFromCart(item: CartItem): void {
        this.cartService.removeFromCart(item);
        this.cartItems = this.cartService.getCartItems();
        this.calculateTotal();
    }

    changeQuantity(item: CartItem, quantity: number): void {
        if (quantity <= 0) {
            this.removeFromCart(item);
        } else {
            item.quantity = quantity;
            this.calculateTotal();
        }
    }

    onSubmit(): void {
        this.cartService.clearCart();
        this.router.navigate(['/success']);
    }
}
