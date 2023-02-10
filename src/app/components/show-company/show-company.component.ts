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
  userInfo: any = {};
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
        if (company.userID)
          this.deleteUserById(company.userID, company.companyID);
        else
          this.deleteCompanyById(company.companyID);
      }
    });
  }

  deleteUserById(userID: any, companyID:any) {
    this.spinnerService.show();
    this.showCompanyService.deleteUserById(userID).subscribe(data => {
      if (data.status) {
        this.deleteCompanyById(companyID);
      }
      this.spinnerService.hide();
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
    const dialogRef = this.dialog.open(RegisterCompanyComponent, {
      panelClass: '', data: companyObj
    });
    dialogRef.afterClosed().subscribe(saveOk => {
      this.getCompanyDetail();
    });
  }

  showUserInfo(userID: any) {
    this.spinnerService.show();
    this.showCompanyService.showUserInfo(userID).subscribe(data => {
      if (data.status) {
        this.userInfo.email = data.email;
        this.userInfo.userName = data.userName;
      }
      this.spinnerService.hide();
    });
  }

  UpdateCompanyRegisteration(userID: any) {
    this.spinnerService.show();
    let model = {
      id: userID,
      userName: this.userInfo.userName,
      password: this.userInfo.password,
      email: this.userInfo.email
    }
    this.showCompanyService.UpdateCompanyRegisteration(model).subscribe(data => {
      if (data.status) {
        this.toastrService.success("Company registration has been updated.");
        this.showUserInfo(userID);
      }
      this.spinnerService.hide();
    });
  }

  OnChangeCompanyStatus(event: any, companyID: any, userID:any) {
    this.spinnerService.show();
    this.showCompanyService.OnChangeCompanyStatus(companyID, event.checked).subscribe(data => {
      if (data.status) {
        this.OnChangeUserStatus(event.checked, userID);
      }
      this.spinnerService.hide();
    });
  }

  OnChangeUserStatus(event: any, userID: any) {
    this.spinnerService.show();
    this.showCompanyService.OnChangeUserStatus(event, userID).subscribe(data => {
      if (data.status) {
        let statusCompany: string = 'activated';
        if (!event.checked)
          statusCompany = 'deactivated';
        this.toastrService.success("Company account has been " + statusCompany);
        this.getCompanyDetail();
      }
      this.spinnerService.hide();
    });
  }
}
