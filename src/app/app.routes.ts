import { Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { ProductPageComponent } from './components/pages/product-page/product-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'CrockBike',
  },
  {
    path: 'product',
    component: ProductPageComponent,
    title: 'Product',
  },
  { path: '**', redirectTo: '' },
];
