import { Component, Input, OnInit } from '@angular/core';
import { ShowItemComponent } from '../show-item/show-item.component';
import { CarouselModule } from 'primeng/carousel';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Product } from '../../types/data';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [ShowItemComponent, CarouselModule, CommonModule, AsyncPipe],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

    @Input() title = '';
    @Input() data : Observable<Product[]> | null = null;

}
