import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: 'register-company', name: 'Register Company', type: 'link', icon: 'crop_7_5' },
  { state: 'show-company', name: 'Company Detail', type: 'link', icon: 'crop_7_5' },
  { state: 'post-job', name: 'Post Job', type: 'link', icon: 'crop_7_5' },
  { state: 'show-job', name: 'Show Job', type: 'link', icon: 'crop_7_5' },
  { state: 'employees', name: 'Employees', type: 'link', icon: 'crop_7_5' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
