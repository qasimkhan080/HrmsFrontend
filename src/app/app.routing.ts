import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth.guard';
import { ErrorComponent } from './common/error/error.component';
import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'dashboard',
    component: FullComponent,
    loadChildren: () => import('src/app/components/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'post-job',
    component: FullComponent,
    loadChildren: () => import('src/app/components/post-job/post-job.module').then(m => m.PostJobModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'show-job',
    component: FullComponent,
    loadChildren: () => import('src/app/components/show-job/show-job.module').then(m => m.ShowJobModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register-company',
    component: FullComponent,
    loadChildren: () => import('src/app/components/register-company/register-company.module').then(m => m.RegisterCompanyModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'error',
    component: ErrorComponent
  }
];
