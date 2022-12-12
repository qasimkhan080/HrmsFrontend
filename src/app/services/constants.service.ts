import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() { }
  // Login API URLs
  public readonly urlLogin = environment.ApiUrl + '/api/ApplicationUsers/Login';
  // Post Job URLs
  public readonly urlSavePostJob = environment.ApiUrl + '/api/PostJob/SavePostJob';
  public readonly urlGetPostedJob = environment.ApiUrl + '/api/PostJob/GetPostedJob';
  public readonly urlDeletePostedJob = environment.ApiUrl + '/api/PostJob/DeletePostedJob';
}
