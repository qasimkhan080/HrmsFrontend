import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserContextService } from '../../../services/user-context.service';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalCompanyCount: any = 0;
  totalActiveCompanyCount: any = 0;
  totalInActiveCompanyCount: any = 0;

  constructor(public dialog: MatDialog, private dashboardService: DashboardService,
    private toastrService: ToastrService, private spinnerService: NgxSpinnerService,
    private userContextService: UserContextService) { }

  ngOnInit(): void {
    this.getAdminDashboardData();
  }

  getAdminDashboardData() {
    this.spinnerService.show();
    this.dashboardService.getAdminDashboardData().subscribe(data => {
      if (data.status) {
        let result :any= data.result;
        this.totalCompanyCount = result.totalCompanyCount;
        this.totalActiveCompanyCount = result.totalActiveCompanyCount;
        this.totalInActiveCompanyCount = result.totalInActiveCompanyCount;
      }
      this.spinnerService.hide();
    });
  }
}
