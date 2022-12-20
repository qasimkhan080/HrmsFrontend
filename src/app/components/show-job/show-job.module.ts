import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowJobRoutingModule } from './show-job-routing.module';
import { ShowJobComponent } from './show-job.component';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ConfirmationPopupComponent } from '../../../app/common/confirmation-popup/confirmation-popup.component';

@NgModule({
  declarations: [
    ShowJobComponent, ConfirmationPopupComponent
  ],
  imports: [
    CommonModule,
    ShowJobRoutingModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ]
})
export class ShowJobModule { }
