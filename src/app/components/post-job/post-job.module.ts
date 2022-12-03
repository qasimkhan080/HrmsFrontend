import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostJobRoutingModule } from './post-job-routing.module';
import { PostJobComponent } from './post-job.component';
import { PostJobPopupComponent } from '../../common/post-job-popup/post-job-popup.component';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    PostJobComponent, PostJobPopupComponent
  ],
  imports: [
    CommonModule,
    PostJobRoutingModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
  ]
})
export class PostJobModule { }
