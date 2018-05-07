import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { BackgroundMode } from '@ionic-native/background-mode';
import { BgTask } from '../../providers/bg-task';
import { DeviceDataProvider } from '../../providers/device-data';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  peripheral: any = {};
  statusMessage: string;

  constructor(public navCtrl: NavController,
    private ble: BLE,
    private toastCtrl: ToastController,
    private ngZone: NgZone,
    private storage: Storage,
    private bgTask: BgTask,
    private deviceData: DeviceDataProvider) {

    console.log("Detail Page");
    //let device = deviceData.getDevice();
    //var devId = device.id;

    // this.storage.get('mobiledeviceId').then((val) =>{ 
    //   console.log(" ################## "+val);
    // });   
    let device = this.deviceData.getDevice();
    //console.log("Before RUN........");
    //this.ngZone.run(() => {
    // console.log("NG RUN..........");
    this.setStatus('Attempting to connecting to ' + device.id);

    this.ble.isConnected(device.id).then(
      () => { console.log("device already connected") }
    ).catch(
      () => { console.log("not connected..................") }
    );

    // this.ble.connect(device.id).subscribe(
    //   (peripheral) => { this.onConnected(peripheral) },
    //   (peripheral) => { this.onDisconnected(peripheral) }
    // );
    this.attemptingToConnect(device);

    //});

  }

  ionViewDidLoad() {

  }

  attemptingToConnect(device) {
    console.log("####### Attempting to connect to: " + device.id);
    this.ble.connect(device.id).subscribe(
      (peripheral) => { this.onConnected(peripheral) },
      (peripheral) => { this.onDisconnected(peripheral) }
    );
  }

  onConnected(peripheral) {
    console.log("################## CONNECTED!!! START SUBSCRIBING!!!");
    //this.ngZone.run(() => {
      this.setStatus('Bluetooth connected');
      this.peripheral = peripheral;
      this.storage.set('mobiledeviceId', peripheral.id).then(
        () => {                   
          //TODO
          console.log("###### TEST 1");
          this.ble.read(peripheral.id,'ff51b30e-d7e2-4d93-8842-a7c4a57dfb99','ff51b30e-d7e2-4d93-8842-a7c4a57dfb09').then(
            (data) => {
              console.log("DATA FROM SERVICE :::::: " + data);
              var a = new Uint8Array(data);
              console.log(">> DATA[0]: " + a);
            }
          ).catch((err)=>{
            console.log("ERROR FROM SERVICE :::::: " + err);
          });
        }
      );
   // });
  }

  onDisconnected(err) {
    console.log("ERROR OCCURED: " + err.string);
    // let toast = this.toastCtrl.create({
    //   message: 'The peripheral unexpectedly disconnected',
    //   duration: 3000,
    //   position: 'middle'
    // });
    // toast.present();
  }

  // If we need to Disconnect peripheral when leaving the page
  ionViewWillLeave() {
    // console.log('ionViewWillLeave disconnecting Bluetooth');
    // this.ble.disconnect(this.peripheral.id).then(
    //   () => console.log('Disconnected ' + JSON.stringify(this.peripheral)),
    //   () => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral))
    // )
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

}