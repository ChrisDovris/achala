import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShowListComponent } from './pages/show-list/show-list.component';
import { ShowDetailComponent } from './pages/show-detail/show-detail.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'show-list/:generalType', component: ShowListComponent},
    {path: 'show-list/:generalType/:type', component: ShowListComponent},
    {path: 'show-detail/:id', component: ShowDetailComponent}

];
