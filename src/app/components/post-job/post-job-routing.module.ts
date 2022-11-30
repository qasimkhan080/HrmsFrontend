import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostJobComponent } from 'src/app/components/post-job/post-job.component';

const routes: Routes = [
  {
    path: '',
    component: PostJobComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostJobRoutingModule { }

