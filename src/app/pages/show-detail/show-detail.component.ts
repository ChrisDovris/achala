import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../types/data';
import { CommonModule} from '@angular/common';
import { ImageModule } from 'primeng/image';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { FieldsetModule } from 'primeng/fieldset';
import { BannerComponent } from '../../components/banner/banner.component';
import { SupportBannerComponent } from '../../components/support-banner/support-banner.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { NewsletterComponent } from '../../components/newsletter/newsletter.component';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [CommonModule,ImageModule, RatingModule, FormsModule, InputNumberModule, FieldsetModule, BannerComponent,SupportBannerComponent, NewsletterComponent ],
  templateUrl: './show-detail.component.html',
  styleUrl: './show-detail.component.scss'
})
export class ShowDetailComponent implements OnInit{

  constructor(private route : ActivatedRoute,
              private productsService : ProductsService,
              private localStorageService : LocalStorageService
  ) {}

showProduct$ : Observable<Product | null> | null = null;
productId: number = 0;
averageRating: number = 0;
quantityOfProduct = 1;
productsCart: Product[] = [];

topRated = this.productsService.getMostRatedProducts(5)

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.productId = +params['id']
  })

  this.showProduct$ = this.productsService.getProductById(this.productId);
  this.showProduct$.subscribe(product => {
    if(product && product.rating) {
      this.averageRating = this.calculateAverageRating(product.rating)
    }
  })

}



calculateAverageRating(ratings: number[]): number {
  const sum = ratings.reduce((a, b) => a + b, 0);
  return sum / ratings.length;
}


addToCart(product: Product) { 
  if(!this.localStorageService.productInCart(product)) {
    product.quantityOnCart = this.quantityOfProduct;
    this.localStorageService.addToCart(product);
    this.productsCart = [...this.localStorageService.getCartProducts()]  
  }
}

}
