import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RegisterCompanyService } from '../register-company/register-company.service';
import { PreviewCompanyPopupComponent } from '../../common/preview-company-popup/preview-company-popup.component';

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
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, private registerCompanyService: RegisterCompanyService,
    private toastrService: ToastrService, private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  companyDetailPreview() {
    this.companyRegisterRqst.dialogueName = 'preview-company-detail';
    this.companyRegisterRqst.previewFrom = 'register-company';
    const dialogRef = this.dialog.open(PreviewCompanyPopupComponent, {
      panelClass: 'modal-medium', data: this.companyRegisterRqst
    });

    dialogRef.afterClosed().subscribe(saveOk => {
      if (saveOk) {
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
}
