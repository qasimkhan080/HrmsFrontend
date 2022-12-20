import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AddEmployeesComponent } from '../../common/add-employees/add-employees.component';
import { EmployeesService } from '../employees/employees.service';
import { ConfirmationPopupComponent } from '../../common/confirmation-popup/confirmation-popup.component';
import { PreviewEmployeeDetailPopupComponent } from '../../common/preview-employee-detail-popup/preview-employee-detail-popup.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  searchEmployeesRqst: any = {};
  employeelist: any = [];
  SelectedPageSize: number = 10;
  config_pgEmployeeList = {
    id: "pg_EmployeeList",
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  constructor(public dialog: MatDialog, private employeeService: EmployeesService,
    private toastrService: ToastrService, private spinnerService: NgxSpinnerService) {
    this.searchEmployeesRqst.fullName = '';
    this.searchEmployeesRqst.employmentType = '';
    this.searchEmployeesRqst.department = '';
    this.searchEmployeesRqst.team = '';
  }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEmployeesPopup() {
    let model = {
      dialogueName: 'add-employee'
    }
    const dialogRef = this.dialog.open(AddEmployeesComponent, {
      panelClass: 'modal-medium', data: model
    });
    dialogRef.afterClosed().subscribe(employeeObj => {
      if (employeeObj) {
        this.SaveEmployee(employeeObj);
      }
    });
  }

  SaveEmployee(employeeObj:any) {
    this.spinnerService.show();
    this.employeeService.SaveEmployee(employeeObj).subscribe(data => {
      if (data.status) {
        this.toastrService.success("Employee detail has been saved successfully.", 'Success');
      }
      this.spinnerService.hide();
    });
  }

  getEmployeeList() {
    let model = {
      "fullName": this.searchEmployeesRqst.fullName,
      "employmentType": this.searchEmployeesRqst.employmentType,
      "department": this.searchEmployeesRqst.department,
      "team": this.searchEmployeesRqst.team,
      "pageIndex": this.config_pgEmployeeList.currentPage - 1,
      "pageSize": this.config_pgEmployeeList.itemsPerPage,
    };
    this.spinnerService.show();
    this.employeeService.GetEmployeeList(model).subscribe(data => {
      if (data.status) {
        this.employeelist = data.employeelist;
        this.config_pgEmployeeList.totalItems = data.totalRecords;
      }
      this.spinnerService.hide();
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

  deleteCompanyById(employeeID: any) {
    this.spinnerService.show();
    this.employeeService.DeleteEmployeeDetail(employeeID).subscribe(data => {
      if (data.status) {
        this.toastrService.success("Employee has been deleted.");
        this.getEmployeeList();
      }
      this.spinnerService.hide();
    });
  }

  showEmployeeDetaiPopup(detail: any) {
    detail.dialogueName = 'preview-employee-detail';
    this.dialog.open(PreviewEmployeeDetailPopupComponent, {
      panelClass: 'modal-medium', data: detail
    });
  }

  //selected Page number record 
  onPageChanged(page: any) {
    // set selected page as a current page
    this.config_pgEmployeeList.currentPage = page;
    this.getEmployeeList();
  }
}
