import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PostJobPopupComponent } from '../../common/post-job-popup/post-job-popup.component';
import { ConfirmationPopupComponent } from '../../common/confirmation-popup/confirmation-popup.component';
import { ShowJobService } from '../show-job/show-job.service';

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
    private toastrService: ToastrService,private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getPostedJob();
  }

  getPostedJob() {
    let model = {
      "companyName": this.searchJobRqst.companyName,
      "jobTitle": this.searchJobRqst.jobTitle,
      "jobLocation": this.searchJobRqst.jobLocation,
      "pageIndex": this.config_pgShowJob.currentPage-1,
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
  onPageChanged(page:any) {
    // set selected page as a current page
    this.config_pgShowJob.currentPage = page;
    this.getPostedJob();
  }

  showDetailPopup(detail: any) {
    detail.previewFrom = 'show-job';
    detail.dialogueName = 'preview-post-job';
    this.dialog.open(PostJobPopupComponent, {
      panelClass: 'modal-full', data: detail
    });
  }

  deleteJobPopup(job:any) {
    job.dialogueName = 'delete-confirmation';
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      panelClass: 'modal-full', data: job
    });

    dialogRef.afterClosed().subscribe(ok => {
      if (ok) {
        this.deleteJobById(job.postJobId);
      }
    });
  }

  deleteJobById(postJobId:any) {
    this.spinnerService.show();
    this.showJobService.DeletePostedJob(postJobId).subscribe(data => {
      if (data.status) {
        this.toastrService.success("Posted job has been removed.");
        this.getPostedJob();
      }
      this.spinnerService.hide();
    });
  }
}
