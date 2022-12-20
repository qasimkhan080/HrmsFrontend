import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationPopupComponent } from '../../common/confirmation-popup/confirmation-popup.component';
import { PreviewCompanyPopupComponent } from '../../common/preview-company-popup/preview-company-popup.component';
import { ShowCompanyService } from '../show-company/show-company.service';
import { RegisterCompanyComponent } from '../register-company/register-company.component';

@Component({
  selector: 'app-show-company',
  templateUrl: './show-company.component.html',
  styleUrls: ['./show-company.component.css']
})
export class ShowCompanyComponent implements OnInit {
  searchCompanyRqst: any = {};
  postedCompanylist: any = [];
  SelectedPageSize: number = 10;
  config_pgShowCompany = {
    id: "pg_showCompany",
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  constructor(public dialog: MatDialog, private showCompanyService: ShowCompanyService,
    private toastrService: ToastrService, private spinnerService: NgxSpinnerService) {
    this.searchCompanyRqst.companyName = '';
    this.searchCompanyRqst.industry = '';
    this.searchCompanyRqst.city = '';
    this.searchCompanyRqst.country = '';
  }

  ngOnInit(): void {
    this.getCompanyDetail();
  }

  getCompanyDetail() {
    let searchCompanyDetailRequest = {
      "companyName": this.searchCompanyRqst.companyName,
      "industry": this.searchCompanyRqst.industry,
      "city": this.searchCompanyRqst.city,
      "country": this.searchCompanyRqst.country,
      "pageIndex": this.config_pgShowCompany.currentPage - 1,
      "pageSize": this.config_pgShowCompany.itemsPerPage,
    };
    this.spinnerService.show();
    this.showCompanyService.GetCompanyDetail(searchCompanyDetailRequest).subscribe(data => {
      if (data.status) {
        this.postedCompanylist = data.postedCompanylist;
        this.config_pgShowCompany.totalItems = data.totalRecords;
      }
      this.spinnerService.hide();
    });
  }

  //selected Page number record 
  onPageChanged(page: any) {
    // set selected page as a current page
    this.config_pgShowCompany.currentPage = page;
    this.getCompanyDetail();
  }

  showCompanyPopup(detail: any) {
    detail.previewFrom = 'show-company';
    detail.dialogueName = 'preview-company-detail';
    this.dialog.open(PreviewCompanyPopupComponent, {
      panelClass: 'modal-medium', data: detail
    });
  }

  deleteCompanyPopup(company: any) {
    company.dialogueName = 'delete-confirmation';
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      panelClass: '', data: company
    });

    dialogRef.afterClosed().subscribe(ok => {
      if (ok) {
        this.deleteCompanyById(company.companyID);
      }
    });
  }

  deleteCompanyById(companyID: any) {
    this.spinnerService.show();
    this.showCompanyService.DeleteCompanyDetail(companyID).subscribe(data => {
      if (data.status) {
        this.toastrService.success("Company has been deleted.");
        this.getCompanyDetail();
      }
      this.spinnerService.hide();
    });
  }

  editCompanyPopup(companyObj: any) {
    companyObj.action = 'update';
    this.dialog.open(RegisterCompanyComponent, {
      panelClass: '', data: companyObj
    });
  }
}