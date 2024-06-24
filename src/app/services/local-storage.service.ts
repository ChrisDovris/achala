import { Injectable } from '@angular/core';
import { Product } from '../types/data';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  products : Product[] = [];

  constructor() { }


  getCartProducts() {
    return this.products
  }

  saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.products))
  }


  addToCart(addedProduct: Product) {
    this.products.push(addedProduct);
    this.saveCart();
  }

  loadCart() {
    this.products = JSON.parse(localStorage.getItem('cartItems') as any) || [];
  }

  productInCart(product: Product) {
    return this.products.findIndex((x: any) => x.id === product.id) > -1 ;
  }

  removeProduct(product: Product ) {
    const index = this.products.findIndex((x: any) => x.id === product.id )
    if(index > -1){
      this.products.splice(index, 1)
      this.saveCart();
    }
  } 

  clearProducts() {
    this.products = [];
    this.saveCart();
    
  }

}
