import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { ConstantsService } from '../../services/constants.service';
import { UserContextService } from '../../services/user-context.service';

@Injectable({
  providedIn: 'root'
})
export class ShowCompanyService {

  constructor(private Common: CommonService, private Constants: ConstantsService,
    private userContextService: UserContextService) { }

  GetCompanyDetail(searchCompanyDetailRequest: any): Observable<any> {
    let url = this.Constants.urlGetCompanyDetail;
    return this.Common.post(url, searchCompanyDetailRequest);
  }

  DeleteCompanyDetail(companyID: any): Observable<any> {
    let url = this.Constants.urlDeleteCompanyDetail + '/' + companyID;
    return this.Common.get(url);
  }

  deleteUserById(userID: any): Observable<any> {
    let url = this.Constants.urlDeleteUserInfo + '/' + userID;
    return this.Common.get(url);
  }

  showUserInfo(userID: any): Observable<any> {
    let url = this.Constants.urlShowUserInfo + '/' + userID;
    return this.Common.get(url);
  }

  UpdateCompanyRegisteration(model: any): Observable<any> {
    let url = this.Constants.urlUpdateCompanyRegisteration;
    return this.Common.post(url,model);
  }

  OnChangeCompanyStatus(companyID: any,isActivated:any): Observable<any> {
    let url = this.Constants.urlOnChangeCompanyStatus + '/' + companyID + '/' + isActivated;
    return this.Common.get(url);
  }

  OnChangeUserStatus(isActivated: any, userID: any): Observable<any> {
    let model = {
      isActivated: isActivated,
      userID: userID
    }
    let url = this.Constants.urlChangeUserInfoStatus;
    return this.Common.post(url, model);
  }
}
