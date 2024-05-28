import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { Product } from '../../types/data';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { ShowItemComponent } from '../../components/show-item/show-item.component';
import { FieldsetModule } from 'primeng/fieldset';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { __values } from 'tslib';



@Component({
  selector: 'app-show-list',
  standalone: true,
  imports: [CommonModule, CheckboxModule, FormsModule,ShowItemComponent, FieldsetModule],
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.scss'
})
export class ShowListComponent implements OnInit{ 

  constructor(private productsService: ProductsService,
              private route : ActivatedRoute
  ) {}

  showList$: Observable<Product[]> | null = null;
  generalType: 'body' | 'skincare' | 'wellness' = 'body';
  type: string = '';
  checkedValues: string[] = [];
  checkedAttritubesValues: string [] = [];
  checkedTypeValues: Product [] = [] ;

  


    ProductCategories: any[] = [
        { name: 'Deodorant' ,trueValue: 'deodorant',},
        { name: 'Body Oil', trueValue: 'body-oil' },
        { name: 'Hair', trueValue: 'hair' },
        { name: 'Day cream', trueValue:'day-cream' },
        { name: 'Essential Oils', trueValue: 'essential-oils'}
    ];

    TypeCategories: any[] = [
      {name: 'Anti Aginng', trueValue:'anti-aging',disabled: false},
      {name: 'For Babes', trueValue: 'babes',disabled: false},
      {name: 'For Woman', trueValue: 'woman',disabled: false},
      {name: 'For Achne', trueValue:'achne',disabled: false},
      {name: 'Refreshing', trueValue: 'refreshing',disabled: false},
      {name: 'Mature', trueValue:'mature',disabled: false},
    ]

  
  onCheckValues(event: CheckboxChangeEvent, category: any) {
    category.checked = !category.checked;
  
    // Check if the category is a type or an attribute
    const isTypeCategory = this.ProductCategories.some(cat => cat.trueValue === category.trueValue);
    const isAttributeCategory = this.TypeCategories.some(cat => cat.trueValue === category.trueValue);
  
    if (isTypeCategory) {
      // Handle type selection
      if (category.checked) {
        this.checkedValues.push(category.trueValue);
      } else {
        const index = this.checkedValues.indexOf(category.trueValue);
        if (index !== -1) {
          this.checkedValues.splice(index, 1);
        }
      }
    } else if (isAttributeCategory) {
      // Handle attribute selection
      if (category.checked) {
        this.checkedAttritubesValues.push(category.trueValue);
      } else {
        const index = this.checkedAttritubesValues.indexOf(category.trueValue);
        if (index !== -1) {
          this.checkedAttritubesValues.splice(index, 1);
        }
      }
    }
  
    this.updateFilteredProducts();
  }
  
  updateFilteredProducts() {
    if (this.checkedValues.length) {
      const typeRequests = this.checkedValues.map(type => this.productsService.getProductsByType(type));
      forkJoin([...typeRequests]).subscribe(results => {
        this.checkedTypeValues = results.flat();
  
        // Filter products by selected attributes
        let filteredProducts = this.checkedTypeValues;
        if (this.checkedAttritubesValues.length) {
          filteredProducts = this.checkedTypeValues.filter(product => 
            this.checkedAttritubesValues.some(attr => product.attributes.includes(attr))
          );
        }
  
        this.showList$ = new Observable<Product[]>(observer => {
          observer.next(filteredProducts);
          observer.complete();
        });
  
        // Get all attributes from the filtered products
        const allAttributes = this.checkedTypeValues.map(product => product.attributes).flat();
  
        // Disable checkboxes for attributes not present in filtered attributes
        this.TypeCategories.forEach(category => {
          category.disabled = !allAttributes.includes(category.trueValue);
        });
  
      }, error => {
        console.error('Error fetching products', error);
      });
    }
  }
    
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.generalType = params['generalType']
        this.type = params['type']
        this.getPagedShows(this.generalType,this.type);
      })
    }

    getPagedShows(generalType:string, type?: string ){
      if (!type) {
        this.showList$ = this.productsService.getProductsByGeneralType(generalType)
      } else {
        this.showList$ = this.productsService.getProductsByType(type)
      }
      

    }
}
