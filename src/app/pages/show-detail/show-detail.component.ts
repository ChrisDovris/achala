import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../types/data';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [CommonModule,ImageModule ],
  templateUrl: './show-detail.component.html',
  styleUrl: './show-detail.component.scss'
})
export class ShowDetailComponent implements OnInit{

  constructor(private route : ActivatedRoute,
              private productsService : ProductsService
  ) {}

showProduct$ : Observable<Product | null> | null = null;
productId: number = 0;
  

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.productId = +params['id']
    console.log(this.productId);
    console.log(this.showProduct$);
    
  })

  this.showProduct$ = this.productsService.getProductById(this.productId)
}
}
