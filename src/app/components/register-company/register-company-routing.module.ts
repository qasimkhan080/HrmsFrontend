import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterCompanyComponent } from 'src/app/components/register-company/register-company.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterCompanyRoutingModule { }

