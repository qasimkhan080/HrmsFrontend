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
      "jobAddedBy": 'Admin',
      "companyId": 0,
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
    };
    let url = this.Constants.urlSavePostJob;
    return this.Common.post(url, model);
  }
}
