import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Common {
  constructor() { }
  private baseApiUrl: string;
  private baseUrlDev: string = '';
  private baseUrlProd: string = '';



  private isDev: boolean;
  private moneyAmount: number;
  private money: string;
  private m: string;
  private moneyAmountFormatted: number;
  private todaysDate: Date = new Date();
  private todaysDateNew: Date = new Date();

  formatNumberAmounts(amount: string) {
    this.money = parseFloat(amount).toFixed(2);
    this.m = this.money.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return this.m;
  }

  formatMoney(amount: string) {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
    this.moneyAmountFormatted = parseFloat(amount);
    return formatter.format(this.moneyAmount); /* $2,500.00 */
  }

  setIsDev(isDev: boolean): void {
    this.isDev = isDev;
  }

  getBaseUrl(): string {
    if (this.isDev) {
      return this.baseUrlDev;
    } else {
      return this.baseUrlProd;
    }
  }

  getCurrentDate() {
    this.todaysDateNew.setMonth(this.todaysDate.getMonth() + 1);
    return this.todaysDateNew;
  }

  getDateInString(today: Date) {
    var dd: number = today.getDate();
    var mm: number = today.getMonth() + 1;
    var ddStr: string;
    var mmStr: string;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      ddStr = '0' + dd;
    } else {
      ddStr = dd.toString();
    }
    if (mm === 0) {
      mmStr = '12';
      yyyy = yyyy - 1;
    } else if (mm < 10) {
      mmStr = '0' + mm;
    } else {
      mmStr = mm.toString();
    }
    return yyyy + '-' + mmStr + '-' + ddStr;
  }
}
