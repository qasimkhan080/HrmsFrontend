import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() { }
  // Login API URLs
  public readonly urlLogin = environment.ApiUrl + '/api/ApplicationUsers/Login';
  public readonly urlRegisterCompany = environment.ApiUrl + '/api/ApplicationUsers/RegisterCompany';
  // Post Job URLs
  public readonly urlSavePostJob = environment.ApiUrl + '/api/PostJob/SavePostJob';
  public readonly urlGetPostedJob = environment.ApiUrl + '/api/PostJob/GetPostedJob';
  public readonly urlDeletePostedJob = environment.ApiUrl + '/api/PostJob/DeletePostedJob';
  //Register Company Detail URLs
  public readonly urlRegisterCompanyDetail = environment.ApiUrl + '/api/CompanyRegistration/RegisterCompanyDetail';
  public readonly urlGetCompanyDetail = environment.ApiUrl + '/api/CompanyRegistration/GetCompanyDetail';
  public readonly urlDeleteCompanyDetail = environment.ApiUrl + '/api/CompanyRegistration/DeleteCompanyDetail';
  //Employees Module URLs
  public readonly urlSaveEmployee = environment.ApiUrl + '/api/Employee/SaveEmployee';
  public readonly urlGetEmployeeList = environment.ApiUrl + '/api/Employee/GetEmployeeList';
  public readonly urlDeleteEmployeeDetail = environment.ApiUrl + '/api/Employee/DeleteEmployeeDetail';
}
