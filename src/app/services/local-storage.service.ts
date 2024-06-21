import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  products : any[] = [];

  constructor() { }


  getCartProducts() {
    return this.products
  }

  saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.products))
  }


  addToCart(addedProduct: any) {
    this.products.push(addedProduct);
    this.saveCart();
  }

  loadCart() {
    this.products = JSON.parse(localStorage.getItem('cartItems') as any) || [];
  }

  productInCart(product: any) {
    return this.products.findIndex((x: any) => x.id === product.id) > -1 ;
  }

  removeProduct(product: any ) {
    const index = this.products.findIndex((x: any) => x.id === product.id )
    if(index > -1){
      this.products.splice(index, 1)
      this.saveCart();
    }
  } 

  clearProducts() {
    localStorage.clear();
    this.products = [];
  }
  
}
