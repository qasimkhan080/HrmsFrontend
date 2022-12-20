import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ShowCompanyRoutingModule } from './show-company-routing.module';
import { ShowCompanyComponent } from './show-company.component';

@NgModule({
  declarations: [
    ShowCompanyComponent
  ],
  imports: [
    CommonModule,
    ShowCompanyRoutingModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ]
})
export class ShowCompanyModule { }
