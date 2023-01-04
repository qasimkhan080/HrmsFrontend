import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserContextService } from '../../../services/user-context.service';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent implements OnInit {
  totalEmployeesCount: any = 0;
  totalActiveEmployeesCount: any = 0;
  totalInActiveEmployeesCount: any = 0;
  totalJobCount: any = 0;
  companyID: any = 0;

  constructor(public dialog: MatDialog, private dashboardService: DashboardService,
    private toastrService: ToastrService, private spinnerService: NgxSpinnerService,
    private userContextService: UserContextService) {
    this.companyID = this.userContextService.user$._value.companyID;
  }

  ngOnInit(): void {
    this.getCompanyDashboardData();
  }

  getCompanyDashboardData() {
    this.spinnerService.show();
    this.dashboardService.getCompanyDashboardData(this.companyID).subscribe(data => {
      if (data.status) {
        let result: any = data.result;
        this.totalEmployeesCount = result.totalEmployeesCount;
        this.totalActiveEmployeesCount = result.totalActiveEmployeesCount;
        this.totalInActiveEmployeesCount = result.totalInActiveEmployeesCount;
        this.totalJobCount = result.totalJobCount;
      }
      this.spinnerService.hide();
    });
  }
}
