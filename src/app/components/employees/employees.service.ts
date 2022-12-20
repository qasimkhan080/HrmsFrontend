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
}
