import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PostJobPopupComponent } from '../../common/post-job-popup/post-job-popup.component';
import { UserContextService } from '../../services/user-context.service';
import { PostJobService } from '../post-job/post-job.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup = Object.create(null);
  secondFormGroup: FormGroup = Object.create(null);
  jobComposeRqst: any = {};
  descriptionBody: any;
  userRole: any = '';
  companyNameList: any = [];
  quillJobDescTemplateConfig = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean'],
    ]
  };

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, private postJobService: PostJobService,
    private toastrService: ToastrService, private spinnerService: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public d: any, public dialogRef: MatDialogRef<any>,
    private userContextService: UserContextService  ) {
    this.jobComposeRqst = {};
    this.userRole = this.userContextService.user$._value.userRole.toLowerCase();
    if (d && d.action == 'update') {
      this.jobComposeRqst = d;      
    }
    else {
      this.jobComposeRqst.action = 'save';
      this.jobComposeRqst.jobType = 'full';
      this.jobComposeRqst.company = this.userContextService.user$._value.companyName;
      this.jobComposeRqst.companyID = this.userContextService.user$._value.companyID;
      this.jobComposeRqst.jobBenefit = [];
      this.jobComposeRqst.jobBenefit.push('medical');
    }
    if (this.userRole == 'admin') {
      this.getCompaniesName();
    }
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  OnDescriptionContentChanged(content: any) {
    this.jobComposeRqst.description = content.html;
  }

  onChangeJobType($event: any) {
    this.jobComposeRqst.jobType = $event.value;
  }

  onChangeJobBenefit($event: any) {
    this.jobComposeRqst.jobBenefit = $event.value;
  }

  postJobPreview() {
    this.jobComposeRqst.dialogueName = 'preview-post-job';
    this.jobComposeRqst.previewFrom = 'post-job';
    const dialogRef = this.dialog.open(PostJobPopupComponent, {
      panelClass: 'modal-medium', data: this.jobComposeRqst
    });

    dialogRef.afterClosed().subscribe(saveOk => {
      if (saveOk) {
        this.savePostJob();
      }
    });
  }

  // Save post job
  savePostJob() {
    this.spinnerService.show();
    this.postJobService.SavePostJob(this.jobComposeRqst).subscribe(data => {
      if (data.status) {
        this.toastrService.success("Posted jobs has been saved successfully.", 'Success');
      }
      this.spinnerService.hide();
    });
  }

  getCompaniesName() {
    this.spinnerService.show();
    this.postJobService.getCompaniesName().subscribe(data => {
      if (data.status) {
        this.companyNameList = data.companyList;
        if (this.companyNameList && this.companyNameList.length > 0) {
          this.jobComposeRqst.companyID = this.companyNameList[0].companyID;
          this.jobComposeRqst.company = this.companyNameList[0].companyName;
        }
      }
      this.spinnerService.hide();
    });
  }

  changeCompany(event: MatSelectChange) {
    this.jobComposeRqst.companyID = event.value;
    this.jobComposeRqst.company = event.source.triggerValue;
  }
}
