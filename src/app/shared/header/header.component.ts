import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MegaMenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MegaMenuModule } from 'primeng/megamenu';
import { expand } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DatePipe, InputTextModule,FormsModule, MegaMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

   items: MegaMenuItem[] | undefined;
   value: string | undefined;
   logo: MegaMenuItem[] | undefined;

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
            {label: 'DEODORANT', routerLink:'/show-list/body/deodorant',visible:true}, 
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
     ]
   }

   

}
