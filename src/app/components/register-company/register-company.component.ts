import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RegisterCompanyService } from '../register-company/register-company.service';
import { PreviewCompanyPopupComponent } from '../../common/preview-company-popup/preview-company-popup.component';
import { CommonService } from '../../services/common.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
const URL = 'http://localhost:8080/api/upload';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup = Object.create(null);
  secondFormGroup: FormGroup = Object.create(null);
  companyRegisterRqst: any = {};
  descriptionBody: any;
  response: any = { dbPath: '' };
  placeholderLabel = "Upload Company Logo";
  quillCompanyDescTemplateConfig = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean'],
    ]
  };
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
  });
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, private registerCompanyService: RegisterCompanyService,
    private toastrService: ToastrService, private spinnerService: NgxSpinnerService, private Common: CommonService,
    @Inject(MAT_DIALOG_DATA) public d: any, public dialogRef: MatDialogRef<any>) {
    if (d && d.action == 'update')
      this.companyRegisterRqst = d;
    else
      this.companyRegisterRqst.action = 'save';
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.toastrService.success('File successfully uploaded!');
    };
  }

  companyDetailPreview() {
    this.companyRegisterRqst.dialogueName = 'preview-company-detail';
    this.companyRegisterRqst.previewFrom = 'register-company';
    const dialogRef = this.dialog.open(PreviewCompanyPopupComponent, {
      panelClass: 'modal-medium', data: this.companyRegisterRqst
    });

    dialogRef.afterClosed().subscribe(saveOk => {
      if (saveOk) {
        if (this.companyRegisterRqst.action == 'save')
          this.registerUsers();
        else
          this.saveCompanyDetail();
      }
    });
  }

  registerUsers() {
    this.spinnerService.show();
    this.registerCompanyService.registerUsers(this.companyRegisterRqst).subscribe(data => {
      this.spinnerService.hide();
      if (data.status) {
        this.saveCompanyDetail();
      }
    });
  }

  saveCompanyDetail() {
    this.spinnerService.show();
    this.registerCompanyService.RegisterCompanyDetail(this.companyRegisterRqst).subscribe(data => {
      if (data.status) {
        this.toastrService.success("Company detail has been saved successfully.", 'Success');
      }
      this.spinnerService.hide();
    });
  }

  OnDescriptionContentChanged(content: any) {
    this.companyRegisterRqst.description = content.html;
  }

  uploadFinished = (event:any) => {
    this.response = event;
    this.companyRegisterRqst.companyLogo = this.response.dbPath;
  }

  createImgPath(imgPath: string) {
    if (imgPath)
      return environment.ApiUrl + '/' + imgPath;
  }
}
