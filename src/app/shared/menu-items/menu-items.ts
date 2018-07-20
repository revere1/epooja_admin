import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'dashboard',
    name: 'HOME',
    type: 'link',
    icon: 'icon-basic-accelerator'
  },
  {
    state: 'categories',
    name: 'Categories',
    type: 'link',
    icon: 'icon-basic-accelerator'
  },
  {
    state: 'products',
    name: 'Products',
    type: 'link',
    icon: 'fab fa-product-hunt'
  },
  {
    state: 'orders',
    name: 'Orders',
    type: 'link',
    icon: 'icon-basic-hammer'
  },
  {
    state: 'users',
    name: 'Users',
    type: 'link',
    icon: 'fas fa-users'
  }        
      
  
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

 
}
