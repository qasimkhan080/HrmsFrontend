import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PostJobPopupComponent } from '../../common/post-job-popup/post-job-popup.component';
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
    private toastrService: ToastrService, private spinnerService: NgxSpinnerService) {
    this.jobComposeRqst.jobType = 'full';
    this.jobComposeRqst.jobBenefit = [];
    this.jobComposeRqst.jobBenefit.push('medical');
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
      panelClass: 'modal-full', data: this.jobComposeRqst
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
}
