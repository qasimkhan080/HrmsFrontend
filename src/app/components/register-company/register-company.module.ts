import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterCompanyRoutingModule } from './register-company-routing.module';
import { RegisterCompanyComponent } from './register-company.component';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { PreviewCompanyPopupComponent } from '../../common/preview-company-popup/preview-company-popup.component';

@NgModule({
  declarations: [
    RegisterCompanyComponent, PreviewCompanyPopupComponent
  ],
  imports: [
    CommonModule,
    RegisterCompanyRoutingModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
  ]
})
export class RegisterCompanyModule { }
