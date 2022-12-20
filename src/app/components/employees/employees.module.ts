import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { AddEmployeesComponent } from '../../common/add-employees/add-employees.component';
import { PreviewEmployeeDetailPopupComponent } from '../../common/preview-employee-detail-popup/preview-employee-detail-popup.component';

@NgModule({
  declarations: [
    EmployeesComponent, AddEmployeesComponent, PreviewEmployeeDetailPopupComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
  ]
})
export class EmployeesModule { }
