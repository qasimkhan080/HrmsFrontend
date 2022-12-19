import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ConstantsService } from '../../services/constants.service';
import { UserContextService } from '../../services/user-context.service';
import {RouteStateService } from '../../services/route-state.service';
import { MatSnackBar, MatSnackBarModule, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string ='';
  password: string = '';

  constructor(private commonService: CommonService,
    private constantsService: ConstantsService, private userContextService: UserContextService
    , private routeStateService: RouteStateService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onClickLogin() {
    let userModel = {
      Username: this.userName,
      Password: this.password
    }
    //this.loaderService.show();
    let url = this.constantsService.urlLogin;
    this.commonService.post(url, userModel).subscribe(data => {
      //this.loaderService.hide();
      let userData: any = data;
      if (userData && userData.status) {
        this.userContextService.setUser(userData.user);
        this.routeStateService.add("Dashboard", '/dashboard', null, true);
        return;
      }
      this.openSnackBar(userData.message, 'error');
      return;
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
