import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PostJobPopupComponent } from '../../common/post-job-popup/post-job-popup.component';
import { ConfirmationPopupComponent } from '../../common/confirmation-popup/confirmation-popup.component';
import { ShowJobService } from '../show-job/show-job.service';
import { PostJobComponent } from '../post-job/post-job.component';
@Component({
  selector: 'app-show-job',
  templateUrl: './show-job.component.html',
  styleUrls: ['./show-job.component.css']
})
export class ShowJobComponent implements OnInit {
  searchJobRqst: any = {};
  postedJoblist: any = [];
  SelectedPageSize: number = 10;
  config_pgShowJob = {
    id: "pg_showJob",
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  constructor(public dialog: MatDialog, private showJobService: ShowJobService,
    private toastrService: ToastrService, private spinnerService: NgxSpinnerService) {
    this.searchJobRqst.companyName = '';
    this.searchJobRqst.jobTitle = '';
    this.searchJobRqst.jobLocation = '';
  }

  ngOnInit(): void {
    this.getPostedJob();
  }

  getPostedJob() {
    let model = {
      "companyName": this.searchJobRqst.companyName,
      "jobTitle": this.searchJobRqst.jobTitle,
      "jobLocation": this.searchJobRqst.jobLocation,
      "pageIndex": this.config_pgShowJob.currentPage - 1,
      "pageSize": this.config_pgShowJob.itemsPerPage,
    };
    this.spinnerService.show();
    this.showJobService.GetPostedJob(model).subscribe(data => {
      if (data.status) {
        this.postedJoblist = data.postedJobList;
        this.config_pgShowJob.totalItems = data.totalRecords;
      }
      this.spinnerService.hide();
    });
  }

  //selected Page number record 
  onPageChanged(page: any) {
    // set selected page as a current page
    this.config_pgShowJob.currentPage = page;
    this.getPostedJob();
  }

  showDetailPopup(detail: any) {
    detail.previewFrom = 'show-job';
    detail.dialogueName = 'preview-post-job';
    this.dialog.open(PostJobPopupComponent, {
      panelClass: 'modal-medium', data: detail
    });
  }

  deleteJobPopup(job: any) {
    job.dialogueName = 'delete-confirmation';
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      panelClass: '', data: job
    });

    dialogRef.afterClosed().subscribe(ok => {
      if (ok) {
        this.deleteJobById(job.postJobId);
      }
    });
  }

  deleteJobById(postJobId: any) {
    this.spinnerService.show();
    this.showJobService.DeletePostedJob(postJobId).subscribe(data => {
      if (data.status) {
        this.toastrService.success("Posted job has been removed.");
        this.getPostedJob();
      }
      this.spinnerService.hide();
    });
  }

  editJobPopup(job: any, jobBenefit: any) {
    let jobRequest: any = {
      PostJobId: null,
      jobAddedBy: null,
      companyId: null,
      company: 0,
      jobTitle: null,
      jobLocation: null,
      jobTypeLoc: null,
      jobType: null,
      jobBenefit:[],
      salaryRangeFrom: null,
      salaryRangeTo: null,
      description: null,
      createdBy: null,
      createdDate: null,
      modifiedBy: null,
      modifiedDate: null
    };
    let jobBenefits: any = {
      PostJobBenefitId: null,
      PostJobId: null,
      BenefitId: null,
      BenefitTitle: null,
      CreatedBy: null,
      CreatedDate: null,
      ModifiedBy: null,
      ModifiedDate: null
    }
    jobRequest = job ? JSON.parse(JSON.stringify(job)) : jobRequest;
    jobBenefits = jobBenefit ? JSON.parse(JSON.stringify(jobBenefit)) : jobBenefits;
    jobRequest.action = 'update';
    if (!jobRequest.jobType) {
      jobRequest.jobType = 'full';
    }
    jobRequest.jobBenefit = [];
    if (!jobBenefits || jobBenefits.length == 0) {
      jobRequest.jobBenefit.push('medical');
    }
    else {
      for (let _benefit of jobBenefits) {
        job.jobBenefit.push(_benefit.benefitTitle);
      }
    }
    this.dialog.open(PostJobComponent, {
      panelClass: '', data: job
    });
  }
}
