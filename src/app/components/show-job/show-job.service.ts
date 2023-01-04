import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { ConstantsService } from '../../services/constants.service';
import { UserContextService } from '../../services/user-context.service';

@Injectable({
  providedIn: 'root'
})
export class ShowJobService {

  constructor(private Common: CommonService, private Constants: ConstantsService,
    private userContextService: UserContextService) { }

  GetPostedJob(jobComposeRqstModel: any): Observable<any> {    
    let url = this.Constants.urlGetPostedJob;
    return this.Common.post(url, jobComposeRqstModel);
  }

  DeletePostedJob(postJobId: any): Observable<any> {
    let url = this.Constants.urlDeletePostedJob + '/' + postJobId;
    return this.Common.get(url);
  }

  onChangeJobActivationStatus(postJobId: any, isActivated: any): Observable<any> {
    let url = this.Constants.urlOnChangeJobActivationStatus + '/' + postJobId + '/' + isActivated;
    return this.Common.get(url);
  }
}
