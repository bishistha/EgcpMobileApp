
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BLE } from '@ionic-native/ble';
import { AlertController } from 'ionic-angular';
import { DeviceDataProvider } from '../../providers/device-data';
import { Device } from '@ionic-native/device';

@Component({
  selector: 'page-home',
  templateUrl: 'contact.html'
})
export class ContactPage {

  counter: number = 0;
  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;
  payload: String = null;
  deviceList: Device[] = null;

  constructor(private bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController, private deviceDataProvider: DeviceDataProvider) {
    bluetoothSerial.enable();
  }

  startScanning() {

    this.pairedDevices = null;
    this.unpairedDevices = null;
    this.gettingDevices = true;
    this.bluetoothSerial.discoverUnpaired().then((success) => {
      // this.deviceList.length
      this.unpairedDevices = success;
      this.gettingDevices = false;
      success.forEach(element => {
        // alert(element.name);
        if (element.name == "pi") {
          // alert(element.address);
          // this.bluetoothSerial.connect(element.address).subscribe(this.success, this.fail);
          alert("Pi found...");
        }
      });
    },
      (err) => {
        console.log(err);
      })

    this.bluetoothSerial.list().then((success) => {
      this.pairedDevices = success;
    },
      (err) => {
        console.log(err);
      })
  }

  selectDevice(address: any) {

    let alert = this.alertCtrl.create({
      title: 'Connect',
      message: 'Do you want to connect with?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Connect',
          handler: () => {
            this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);
          }
        }
      ]
    });
    alert.present();

  }

  success(device) {
    //alert("sucess "+ this.counter+data + "\n");
    // console.log(data);
    // if(data)
    this.bluetoothSerial.read().then(
      (data) => {
        this.deviceDataProvider.setData(data);
        console.log("Data received: " + data);
      }



    ).catch();

    //   this.deviceDataProvider.setData("Hello World!!!");
    // this.bluetoothSerial.read().then((data) => {
    //   console.log(data);
    //   if(data)
    //     this.deviceDataProvider.setData(data);
    // })
    this.counter++;
  }

  fail(data) {
    alert("fail: " + data);
    // console.log(data);
    // this.alertCtrl.create
  }

  readData() {
    this.bluetoothSerial.read().then((success) => {
      this.payload = success;
    },
      (err) => {
        console.log(err);
      });
  }

  disconnect() {
    let alert = this.alertCtrl.create({
      title: 'Disconnect?',
      message: 'Do you want to Disconnect?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Disconnect',
          handler: () => {
            this.bluetoothSerial.disconnect();
          }
        }
      ]
    });
    alert.present();
  }

  // ASCII only
  stringToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
      array[i] = string.charCodeAt(i);
    }
    return array.buffer;
  }

  // ASCII only
  bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }
}
