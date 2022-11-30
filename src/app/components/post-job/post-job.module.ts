import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostJobRoutingModule } from './post-job-routing.module';
import { PostJobComponent } from './post-job.component';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PostJobComponent
  ],
  imports: [
    CommonModule,
    PostJobRoutingModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class PostJobModule { }
