import { Component, OnInit } from '@angular/core';
import { UserContextService } from '../../services/user-context.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userRole: any = '';

  constructor(private userContextService: UserContextService) {
    this.userRole = this.userContextService.user$._value.userRole.toLowerCase();
  }

  ngOnInit(): void {
  }
}
