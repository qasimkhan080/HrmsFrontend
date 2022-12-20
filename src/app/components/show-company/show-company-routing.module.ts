import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowCompanyComponent } from 'src/app/components/show-company/show-company.component';

const routes: Routes = [
  {
    path: '',
    component: ShowCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowCompanyRoutingModule { }

