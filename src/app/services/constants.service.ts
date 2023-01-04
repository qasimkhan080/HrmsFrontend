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
  public readonly urlRegisterEmployee = environment.ApiUrl + '/api/ApplicationUsers/RegisterEmployee';
  public readonly urlShowUserInfo = environment.ApiUrl + '/api/ApplicationUsers/ShowUserInfo';
  public readonly urlUpdateCompanyRegisteration = environment.ApiUrl + '/api/ApplicationUsers/UpdateCompanyRegisteration';
  public readonly urlDeleteUserInfo = environment.ApiUrl + '/api/ApplicationUsers/DeleteUserInfo';
  // Post Job URLs
  public readonly urlSavePostJob = environment.ApiUrl + '/api/PostJob/SavePostJob';
  public readonly urlGetPostedJob = environment.ApiUrl + '/api/PostJob/GetPostedJob';
  public readonly urlDeletePostedJob = environment.ApiUrl + '/api/PostJob/DeletePostedJob';
  public readonly urlOnChangeJobActivationStatus = environment.ApiUrl + '/api/PostJob/OnChangeJobActivationStatus';
  //Register Company Detail URLs
  public readonly urlRegisterCompanyDetail = environment.ApiUrl + '/api/CompanyRegistration/RegisterCompanyDetail';
  public readonly urlGetCompanyDetail = environment.ApiUrl + '/api/CompanyRegistration/GetCompanyDetail';
  public readonly urlDeleteCompanyDetail = environment.ApiUrl + '/api/CompanyRegistration/DeleteCompanyDetail';
  public readonly urlOnChangeCompanyStatus = environment.ApiUrl + '/api/CompanyRegistration/OnChangeCompanyStatus';
  public readonly urlChangeUserInfoStatus = environment.ApiUrl + '/api/ApplicationUsers/ChangeUserInfoStatus';
  public readonly urlGetCompaniesName = environment.ApiUrl + '/api/CompanyRegistration/GetCompaniesName';
  //Employees Module URLs
  public readonly urlSaveEmployee = environment.ApiUrl + '/api/Employee/SaveEmployee';
  public readonly urlGetEmployeeList = environment.ApiUrl + '/api/Employee/GetEmployeeList';
  public readonly urlDeleteEmployeeDetail = environment.ApiUrl + '/api/Employee/DeleteEmployeeDetail';
  public readonly urlOnChangeEmployeeStatus = environment.ApiUrl + '/api/Employee/OnChangeEmployeeStatus';
  //Dashboard Module URLs
  public readonly urlGetAdminDashboardData = environment.ApiUrl + '/api/Dashboard/GetAdminDashboardData';
  public readonly urlGetCompanyDashboardData = environment.ApiUrl + '/api/Dashboard/GetCompanyDashboardData';
  //Upload File Url
  public readonly urlUpload = environment.ApiUrl + '/api/UploadFile/Upload';
}
