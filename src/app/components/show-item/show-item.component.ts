import { Component, Input } from '@angular/core';
import { Product } from '../../types/data';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-show-item',
  standalone: true,
  imports: [CommonModule, UpperCasePipe, RouterLink],
  templateUrl: './show-item.component.html',
  styleUrl: './show-item.component.scss'
})
export class ShowItemComponent {

  @Input() product : Product | null = null;
  @Input() generalType: 'body' | 'skincare' | 'wellness' = 'body';
  @Input() type: string = '';
}
