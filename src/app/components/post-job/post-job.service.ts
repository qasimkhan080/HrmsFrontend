import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { ConstantsService } from '../../services/constants.service';
import { UserContextService } from '../../services/user-context.service';

@Injectable({
  providedIn: 'root'
})
export class PostJobService {

  constructor(private Common: CommonService, private Constants: ConstantsService,
    private userContextService: UserContextService) { }

  SavePostJob(jobComposeRqstModel:any): Observable<any> {
    let model = {
      "PostJobId": jobComposeRqstModel.postJobId,
      "jobAddedBy": 'Admin',
      "companyId": jobComposeRqstModel.companyID,
      "companyName": jobComposeRqstModel.company,
      "jobTitle": jobComposeRqstModel.jobTitle,
      "jobLocation": jobComposeRqstModel.jobLocation,
      "jobTypeLoc": jobComposeRqstModel.jobTypeLoc,
      "jobType": jobComposeRqstModel.jobType,
      "jobSalaryRangeFrom": jobComposeRqstModel.salaryRangeFrom,
      "jobSalaryRangeTo": jobComposeRqstModel.salaryRangeTo,
      "jobBenefit": jobComposeRqstModel.jobBenefit,
      "jobDescription": jobComposeRqstModel.description,
      "isDeleted": false,
      "createdBy": this.userContextService.user$._value.id,
      "action": jobComposeRqstModel.action
    };
    let url = this.Constants.urlSavePostJob;
    return this.Common.post(url, model);
  }
}
