import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DeviceDataProvider {

  private data: any;
  private device: any;
  private statusMessage: string;


  constructor() {

  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }

  getDevice(){
    return this.device;
  }

  setDevice(device: any){
    console.log('setter... ' + device);
    this.device = device;
  }

//   getFleets(): Observable<string[]> {
//     return Rx.Observable.of(this.fleets);
// }
}
