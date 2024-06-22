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
    this.getTotalCartPrice();
  }


  addToCart(addedProduct: any) {
    this.products.push(addedProduct);
    this.getTotalCartPrice();
    this.saveCart();
  }

  loadCart() {
    this.products = JSON.parse(localStorage.getItem('cartItems') as any) || [];
    this.getTotalCartPrice();
  }

  productInCart(product: any) {
    return this.products.findIndex((x: any) => x.id === product.id) > -1 ;
    this.getTotalCartPrice();
  }

  removeProduct(product: any ) {
    const index = this.products.findIndex((x: any) => x.id === product.id )
    if(index > -1){
      this.products.splice(index, 1)
      this.saveCart();
      this.getTotalCartPrice();
    }
  } 

  clearProducts() {
    localStorage.clear();
    this.products = [];
  }

  getTotalCartPrice() {  
    return this.products.reduce((total, product) => total + product.price * product.quantity, 0);
  }

  
}
