import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data, Product } from '../types/data';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Data>(
      'assets/seeds/seed.json'
    ).pipe(map(data => data.products)
    );
}



getMostRatedProducts(numProducts: number) {
  return this.http.get<Data>(
    'assets/seeds/seed.json'
  ).pipe(
    map(data => data.products),
    map(products => {
      // Calculate average rating for each product
      products.forEach(product => {
        if (product.rating && Array.isArray(product.rating) && product.rating.length > 0) {
          const sum = product.rating.reduce((acc, curr) => acc + curr, 0);
          product.averageRating = sum / product.rating.length;
        } else {
          product.averageRating = 0; // Set default value for products with no ratings
        }
      });
      // Sort products based on average rating in descending order
      products.sort((a, b) => b.averageRating - a.averageRating);

      // Return the specified number of most rated products
      return products.slice(0, numProducts);
    })
  );
}

getProductsByGeneralType(generalType: string): Observable<Product[]> {
  return this.http.get<Data>(
    'assets/seeds/seed.json'
    ).pipe(
    map(data => data.products),
    map(products => products.filter(product => product.generalType === generalType))
  );
}
getProductsByType(type: string): Observable<Product[]> {
  return this.http.get<Data>(
    'assets/seeds/seed.json'
    ).pipe(
    map(data => data.products),
    map(products => products.filter(product => product.type === type))
  );
}

getProductByAttributes( attritubes: string[]): Observable<Product[]> {
  return this.http.get<Data>(
    'assets/seeds/seed.json'
    ).pipe(
    map(data => data.products),
    map(products => products.filter(product => product.attributes === attritubes)),
  );
}


getProductById(id: number): Observable<Product | null> {
  return this.http.get<{ products: Product[] }>(
    'assets/seeds/seed.json'
  ).pipe(
    map(response => {
      const products = response.products;
      if (Array.isArray(products)) {
        const product = products.find(p => p.id === id);
        return product ? product : null;
      } else {
        return null;
      }
    })
  );
}



}
