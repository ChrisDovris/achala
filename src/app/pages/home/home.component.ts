import { Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { ProductsService } from '../../services/products.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent,JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  constructor( private productsService: ProductsService ) {}

  // topRated = this.productsService.getProducts()

  topRated = this.productsService.getMostRatedProducts(5)
}
