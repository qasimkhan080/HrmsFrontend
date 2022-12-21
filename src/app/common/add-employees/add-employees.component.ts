import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent implements OnInit {
  model: any = {};
  isLinear = false;
  firstFormGroup: FormGroup = Object.create(null);
  secondFormGroup: FormGroup = Object.create(null);
  employeeRegisterRqst: any = {};
  constructor(@Inject(MAT_DIALOG_DATA) public d: any, public dialog: MatDialog, public dialogRef: MatDialogRef<any>) {
    this.model = d;
    if (this.model.action == 'update') {
      this.employeeRegisterRqst = this.model.employeeObject;
      this.employeeRegisterRqst.hireDate = new Date(this.employeeRegisterRqst.hireDate.slice(0,-2));
      this.employeeRegisterRqst.contractEnd = new Date(this.employeeRegisterRqst.contractEnd.slice(0, -2));
    }
    else {
      this.employeeRegisterRqst.hireDate = new Date();
      this.employeeRegisterRqst.contractEnd = new Date();
    }
    this.employeeRegisterRqst.action = this.model.action;
  }

  ngOnInit(): void {
  }

  OnDescriptionContentChanged(content: any) {
    this.employeeRegisterRqst.description = content.html;
  }

  SaveEmployee(isSave: boolean = false) {
    if (isSave)
      this.dialogRef.close(this.employeeRegisterRqst);
    else
      this.dialogRef.close(false);
  }
}
