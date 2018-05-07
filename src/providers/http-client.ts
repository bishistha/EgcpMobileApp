import {Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { HttpHelper } from './http-helpers';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpClient {
  constructor(private http: Http,  private helper: HttpHelper) { }

  createAuthorizationHeader(headers: Headers) {
    // let token: string = this.borrowerProvider.getToken();
    // let apiKey: string = this.borrowerProvider.getApiKey();
    // let username: string = this.borrowerProvider.getUserName();
    // if (token && apiKey && username) {
    //   headers.append('tokenkey', token);
    //   headers.append('username', username);
    //   headers.append('apikey', apiKey);
    // }

  }

  appendExtraHeaders(extraHeaders: Array<any>, headers: Headers) {
    for (let i = 0; i < extraHeaders.length; i++) {
      headers.append(extraHeaders[i].key, extraHeaders[i].val);
    }
  }

  get(url, extraHeaders: Array<any>) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.createAuthorizationHeader(headers);
    if (extraHeaders) {
      this.appendExtraHeaders(extraHeaders, headers)
    }
    return this.http.get(url, {
      headers: headers
    }).toPromise();
  }

  post(url, data, extraHeaders: Array<any>) {
    let headers = new Headers();
    //console.log(url);
    //console.log(extraHeaders);
    this.createAuthorizationHeader(headers);
    if (extraHeaders) {
      this.appendExtraHeaders(extraHeaders, headers)
    }
    return this.http.post(url, data, {
      headers: headers
    }).toPromise();

  }
}
