import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../types/data';
import { ProductsService } from '../../services/products.service';
import { CommonModule, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-show-item',
  standalone: true,
  imports: [CommonModule, UpperCasePipe],
  templateUrl: './show-item.component.html',
  styleUrl: './show-item.component.scss'
})
export class ShowItemComponent {

  @Input() product : Product | null = null;
  @Input() generalType: 'body' | 'skincare' | 'wellness' = 'body';
  @Input() type: string = '';
}
