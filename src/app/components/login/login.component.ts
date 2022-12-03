import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ConstantsService } from '../../services/constants.service';
import { UserContextService } from '../../services/user-context.service';
import { RouteStateService } from '../../services/route-state.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string = '';
  password: string = '';
  typeSelected: string = 'ball-fussion';

  constructor(private commonService: CommonService,
    private constantsService: ConstantsService, private userContextService: UserContextService
    , private routeStateService: RouteStateService, private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  onClickLogin() {
    let userModel = {
      Username: this.userName,
      Password: this.password
    }
    this.spinnerService.show();
    let url = this.constantsService.urlLogin;
    this.commonService.post(url, userModel).subscribe(data => {
      this.spinnerService.hide();
      let userData: any = data;
      if (userData && userData.status) {
        this.userContextService.setUser(userData.user);
        this.routeStateService.add("Dashboard", '/dashboard', null, true);
        return;
      }
      this.toastrService.error(userData.message, 'Not Authenticated');
      return;
    });
  }
}
