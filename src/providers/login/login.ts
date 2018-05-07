import { Injectable } from '@angular/core';
import { HttpClient } from '../http-client';
import { HttpHelper } from '../http-helpers';
import { Common } from '../common';
import 'rxjs/add/operator/map';


/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginProvider {

  private Login: boolean = false;
  private httpHelper: HttpHelper = new HttpHelper();
  private isDev: boolean = true;

  constructor(private http: HttpClient,
    private common: Common) {
  }

  isLogin() {
    return this.Login;
  }

  setIsLogin(isLoggedIn: boolean) {
    this.Login = isLoggedIn;
  }

  login(username: string, password: string) {
    let cr = [{ key: 'password', val: password }, { key: 'username', val: username }];
    if (username.startsWith("ccc-")) {
      this.common.setIsDev(true);
    } else {
      this.common.setIsDev(false);
    }
    return this.http.post(`${this.common.getBaseUrl()}/auth/login/`, null, cr);
  }
  
  resetPass(username: string, ssn: string) {
    let cr = [{ key: 'ssn', val: ssn }, { key: 'username', val: username }];
    if (username.startsWith("ccc-")) {
      this.common.setIsDev(true);
    } else {
      this.common.setIsDev(false);
    }
    return this.http.get(`${this.common.getBaseUrl()}/rest/borrower/requestNewPassword`, cr);
  }
}
