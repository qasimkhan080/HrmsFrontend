import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';
import { WebcamComponent } from '../../common/webcam/webcam.component';

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
  placeholderLabel = "Upload Employee Picture";
  response: any = { dbPath: '' };
  captureImage = '';

  constructor(@Inject(MAT_DIALOG_DATA) public d: any, public dialog: MatDialog, public dialogRef: MatDialogRef<any>) {
    this.model = d;
    if (this.model.action == 'update') {
      this.employeeRegisterRqst = this.model.employeeObject;
      this.employeeRegisterRqst.hireDate = new Date(this.employeeRegisterRqst.hireDate.toString().slice(0,-2));
      this.employeeRegisterRqst.contractEnd = new Date(this.employeeRegisterRqst.contractEnd.toString().slice(0, -2));
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

  uploadFinished = (event: any) => {
    this.response = event;
    this.employeeRegisterRqst.employeePhoto = this.response.dbPath;
    this.employeeRegisterRqst.photoType = 'uploadedurl';
  }

  createImgPath() {
    if (this.employeeRegisterRqst.action == 'update') {
      if (this.employeeRegisterRqst.photoType && this.employeeRegisterRqst.photoType == 'webcamurl') {
        return this.employeeRegisterRqst.employeePhoto;
      }
      else {
        return environment.ApiUrl + '/' + this.employeeRegisterRqst.employeePhoto;
      }
    }
    else {
      if (this.response.dbPath)
        return environment.ApiUrl + '/' + this.response.dbPath;
      else
        return this.captureImage;
    }
  }

  openWebcam() {
    const dialogRef = this.dialog.open(WebcamComponent, {
      panelClass: 'modal-medium', data: ''
    });

    dialogRef.afterClosed().subscribe(captureImg => {
      if (captureImg) {
        this.captureImage = captureImg;
        this.employeeRegisterRqst.employeePhoto = this.captureImage;
        this.employeeRegisterRqst.photoType = 'webcamurl';
      }
    });
  }

  resetPicture() {
    this.response.dbPath = '';
    this.captureImage = '';
    this.employeeRegisterRqst.employeePhoto = '';
    this.employeeRegisterRqst.photoType = '';
  }
}
