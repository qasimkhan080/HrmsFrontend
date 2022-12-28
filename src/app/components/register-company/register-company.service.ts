import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { ConstantsService } from '../../services/constants.service';
import { UserContextService } from '../../services/user-context.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterCompanyService {

  constructor(private Common: CommonService, private Constants: ConstantsService,
    private userContextService: UserContextService) { }

  RegisterCompanyDetail(companyRegisterRqst: any): Observable<any> {
    let model = {
      "companyID": companyRegisterRqst.companyID,
      "companyName": companyRegisterRqst.companyName,
      "owner": companyRegisterRqst.owner,
      "industry": companyRegisterRqst.industry,
      "streetAddress": companyRegisterRqst.streetAddress,
      "city": companyRegisterRqst.city,
      "state": companyRegisterRqst.state,
      "country": companyRegisterRqst.country,
      "zipCode": companyRegisterRqst.zipCode,
      "emailAddress": companyRegisterRqst.emailAddress,
      "phoneNumber": companyRegisterRqst.phoneNumber,
      "description": companyRegisterRqst.description,
      "isDeleted": false,
      "createdBy": this.userContextService.user$._value.id,
      "action": companyRegisterRqst.action
    };
    let url = this.Constants.urlRegisterCompanyDetail;
    return this.Common.post(url, model);
  }

  registerUsers(companyRegisterRqst: any): Observable<any> {
    let model = {
      "Email": companyRegisterRqst.emailAddress,
      "Username": companyRegisterRqst.userName,
      "Password": companyRegisterRqst.password
    };
    let modelString = JSON.stringify(model);
    let encodedModel = this.Common.EncryptTo64(modelString);
    let url = this.Constants.urlRegisterCompany + "/" + encodedModel;
    return this.Common.get(url);
  }
}
