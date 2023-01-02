import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AddEmployeesComponent } from '../../common/add-employees/add-employees.component';
import { EmployeesService } from '../employees/employees.service';
import { ConfirmationPopupComponent } from '../../common/confirmation-popup/confirmation-popup.component';
import { PreviewEmployeeDetailPopupComponent } from '../../common/preview-employee-detail-popup/preview-employee-detail-popup.component';
import { ShowCompanyService } from '../show-company/show-company.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  searchEmployeesRqst: any = {};
  employeelist: any = [];
  SelectedPageSize: number = 10;
  userInfo: any = {};
  config_pgEmployeeList = {
    id: "pg_EmployeeList",
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  constructor(public dialog: MatDialog, private employeeService: EmployeesService,
    private toastrService: ToastrService, private spinnerService: NgxSpinnerService,
    private showCompanyService: ShowCompanyService  ) {
    this.searchEmployeesRqst.fullName = '';
    this.searchEmployeesRqst.employmentType = '';
    this.searchEmployeesRqst.department = '';
    this.searchEmployeesRqst.team = '';
  }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEmployeesPopup(action: any = 'save', employeeObject: any=null) {    
    let model = {
      heading: action == 'save' ? 'Add Employees' : 'Edit Employees',
      dialogueName: 'add-employee',
      action: action,
      employeeObject: employeeObject
    }
    const dialogRef = this.dialog.open(AddEmployeesComponent, {
      panelClass: 'modal-medium', data: model
    });
    dialogRef.afterClosed().subscribe(employeeObj => {
      if (employeeObj) {
        if (employeeObj.action == 'save')
          this.registerUsers(employeeObj);
        else
          this.SaveEmployee(employeeObj);
      }
    });
  }

  registerUsers(employeeObj: any) {
    this.spinnerService.show();
    this.employeeService.registerUsers(employeeObj).subscribe(data => {
      this.spinnerService.hide();
      if (data.status) {
        this.SaveEmployee(employeeObj);
      }
    });
  }

  SaveEmployee(employeeObj:any) {
    this.spinnerService.show();
    this.employeeService.SaveEmployee(employeeObj).subscribe(data => {
      if (data.status) {
        this.toastrService.success("Employee detail has been saved successfully.", 'Success');
        this.getEmployeeList();
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

  deleteCompanyPopup(employee: any) {
    employee.dialogueName = 'delete-confirmation';
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      panelClass: '', data: employee
    });

    dialogRef.afterClosed().subscribe(ok => {
      if (ok) {
        this.deleteUserById(employee.userID, employee.employeeID);
      }
    });
  }

  deleteUserById(userID: any, employeeID: any) {
    this.spinnerService.show();
    this.showCompanyService.deleteUserById(userID).subscribe(data => {
      if (data.status) {
        this.deleteCompanyById(employeeID);
      }
      this.spinnerService.hide();
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

  UpdateEmployeeRegisteration(userID: any) {
    this.spinnerService.show();
    let model = {
      id: userID,
      userName: this.userInfo.userName,
      password: this.userInfo.password,
      email: this.userInfo.email
    }
    this.showCompanyService.UpdateCompanyRegisteration(model).subscribe(data => {
      if (data.status) {
        this.toastrService.success("Employee registration has been updated.");
        this.showUserInfo(userID);
      }
      this.spinnerService.hide();
    });
  }

  OnChangeEmployeeStatus(event: any, employeeID: any, userID: any) {
    this.spinnerService.show();
    this.employeeService.OnChangeEmployeeStatus(employeeID, event.checked).subscribe(data => {
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
        this.toastrService.success("Employee account has been " + statusCompany);
        this.getEmployeeList();
      }
      this.spinnerService.hide();
    });
  }
}
