import { NavBarItem } from '../../view-models/navbar.model';

export const _nav: NavBarItem[] = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Product',
    url: '/product',
    items: [
      { label: 'Laptop', url: '/product/laptop' },
      { label: 'Camera', url: '/product/camera' },
    ],
  },
];
