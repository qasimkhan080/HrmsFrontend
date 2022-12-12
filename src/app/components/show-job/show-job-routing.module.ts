import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowJobComponent } from 'src/app/components/show-job/show-job.component';

const routes: Routes = [
  {
    path: '',
    component: ShowJobComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowJobRoutingModule { }

