import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-post-job-popup',
  templateUrl: './post-job-popup.component.html',
  styleUrls: ['./post-job-popup.component.css']
})
export class PostJobPopupComponent implements OnInit {
  previewJobRequest: any = {};
  constructor(@Inject(MAT_DIALOG_DATA) public d: any, public dialog: MatDialog, public dialogRef: MatDialogRef<any>) {
    this.previewJobRequest = d;
    if (this.previewJobRequest.previewFrom == 'show-job' && this.previewJobRequest.jobBenefit?.length > 0) {
      this.fillBenefitTitle();
    }
  }

  ngOnInit(): void {
  }

  SaveOrCancel(param: any) {
    if (param == 'save')
      this.dialogRef.close(true);
    else
      this.dialogRef.close(false);
  }

  fillBenefitTitle() {
    let benefitArray: any = {};
    benefitArray= this.previewJobRequest.jobBenefit;
    this.previewJobRequest.jobBenefit = [];
    for (let benefit of benefitArray) {
      let benefitTitle: any = benefit.benefitTitle;
      this.previewJobRequest.jobBenefit.push(benefitTitle);
    }
  }
}
