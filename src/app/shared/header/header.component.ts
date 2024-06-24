import {  CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MegaMenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MegaMenuModule } from 'primeng/megamenu';
import { BadgeModule } from 'primeng/badge';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { LocalStorageService } from '../../services/local-storage.service';
import { ProductsService } from '../../services/products.service';
import { Observable } from 'rxjs';
import { Product } from '../../types/data';
import { InputNumberModule } from 'primeng/inputnumber';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DatePipe, InputTextModule,FormsModule, MegaMenuModule ,BadgeModule ,SidebarModule, ButtonModule, CommonModule, InputNumberModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService,
              private productsService : ProductsService
  ) {

  }

  items: MegaMenuItem[] | undefined;
  value: string | undefined;
  logo: MegaMenuItem[] | undefined;
  sidebarVisible: boolean = false;
  productsInCart: Product[] =  [];
  totalCartPrice: number = 0;


   ngOnInit(): void {

    

this.logo = [
  {
    routerLink: '/',
    label: 'ACHALA',
  }
]
     this.items = [
      {
        routerLink:'/show-list/body',
        label: 'BODY',
        items: [
          [ { items:[
            {label: 'DEODORANT', routerLink:'/show-list/body/deodorant'}, 
            {label: 'BODY OIL', routerLink:'/show-list/body/body-oil'}] } ]
        ],
        expanded: true
      },
      {
        routerLink:'/show-list/skincare',
        label: 'SKINCARE',
        items: [
          [ { items:[
            {label: 'HAIR',routerLink:'/show-list/skincare/hair'}, 
            {label: 'DAY CREAMS', routerLink:'/show-list/skincare/day-creams'}, 
            {label: 'NIGHT CREAMS', routerLink:'/show-list/skincare/night-creams'},
            {label: 'CLEANSERS', routerLink:'/show-list/skincare/cleansers'}, 
            {label: 'LIPS', routerLink:'/show-list/skincare/lips'}] } ],
        ],
        expanded:true
      },
      {
        routerLink:'/show-list/wellness',
        label: 'WELLNESS',
        items: 
        [
          [ { items:[
            {label: 'ESSENTIAL OILS', routerLink:'/show-list/wellness/essential-oils'},
            {label: 'ESSENTIAL CREAMS', routerLink:'/show-list/wellness/essential-creams'}] } ]
        ],
        expanded: false
      },
     ] ;

     this.onDisplayProductsCart();
     
   }

   getTotalPrice() {
    this.totalCartPrice = this.productsInCart.reduce((total, product) => total + product.price * product.quantityOnCart, 0);
    
  }
   
   onDisplayProductsCart() {
    this.productsInCart = this.localStorageService.getCartProducts();
    this.getTotalPrice();
   }

   onRemoveProduct(product: Product) {
    this.localStorageService.removeProduct(product);
    this.onDisplayProductsCart();
   }

   onDeleteCart(){
    this.localStorageService.clearProducts();
    this.onDisplayProductsCart();
   }

  
   
}
