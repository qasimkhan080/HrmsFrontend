import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() { }
  // Login API URLs
  public readonly urlLogin = environment.ApiUrl + '/api/ApplicationUsers/Login';
}
