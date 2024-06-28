import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [InputTextModule, CheckboxModule, FormsModule, ButtonModule, NgClass ],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss'
})
export class NewsletterComponent {

  checked: boolean =false;
  email: any;

}
