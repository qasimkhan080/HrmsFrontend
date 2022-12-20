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
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  constructor(@Inject(MAT_DIALOG_DATA) public d: any, public dialog: MatDialog, public dialogRef: MatDialogRef<any>) {
    this.model = d;
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
