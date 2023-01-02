import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { ConstantsService } from '../../services/constants.service';
import { UserContextService } from '../../services/user-context.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private Common: CommonService, private Constants: ConstantsService,
    private userContextService: UserContextService) { }

  SaveEmployee(employeeObj: any): Observable<any> {
    let url = this.Constants.urlSaveEmployee;
    employeeObj.companyID = this.userContextService.user$._value.companyID;
    return this.Common.post(url, employeeObj);
  }

  GetEmployeeList(searchEmployeesRqst: any): Observable<any> {
    let url = this.Constants.urlGetEmployeeList;
    return this.Common.post(url, searchEmployeesRqst);
  }

  DeleteEmployeeDetail(employeeID: any): Observable<any> {
    let url = this.Constants.urlDeleteEmployeeDetail + '/' + employeeID;
    return this.Common.get(url);
  }

  registerUsers(employeeObj: any): Observable<any> {
    let model = {
      "Email": employeeObj.email,
      "Username": employeeObj.userName,
      "Password": employeeObj.password
    };
    let modelString = JSON.stringify(model);
    let encodedModel = this.Common.EncryptTo64(modelString);
    let url = this.Constants.urlRegisterEmployee + "/" + encodedModel;
    return this.Common.get(url);
  }

  OnChangeEmployeeStatus(employeeID: any, isActivated: any): Observable<any> {
    let url = this.Constants.urlOnChangeEmployeeStatus + '/' + employeeID + '/' + isActivated;
    return this.Common.get(url);
  }
}
