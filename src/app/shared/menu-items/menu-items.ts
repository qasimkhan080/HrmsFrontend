import { Injectable } from '@angular/core';
import * as Enumerable from 'linq';
import { UserContextService } from '../../services/user-context.service';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  permission: string;
}
let MENUITEMS: Menu[] = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer', permission:'admin,company,employee' },
  { state: 'register-company', name: 'Register Company', type: 'link', icon: 'crop_7_5', permission: 'admin' },
  { state: 'show-company', name: 'Company Detail', type: 'link', icon: 'crop_7_5', permission: 'admin,company' },
  { state: 'post-job', name: 'Post Job', type: 'link', icon: 'crop_7_5', permission: 'company' },
  { state: 'show-job', name: 'Show Job', type: 'link', icon: 'crop_7_5', permission: 'company,employee' },
  { state: 'employees', name: 'Employees', type: 'link', icon: 'crop_7_5', permission: 'company' },
];
@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    let menuList: Menu[] = MENUITEMS;
    let currentUsers: any = sessionStorage.getItem('currentUser');
    let users: any = JSON.parse(currentUsers);
    let model: any = Enumerable.default.from(menuList).where(function (x: any) {
      return x.permission.toLowerCase().indexOf(users.userRole.toLowerCase())>-1;
    }).toArray();
    return model;
  }
}
