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
}
