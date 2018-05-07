import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { HomePage } from '../home/home';
import { NgZone } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { DetailPage } from '../detail/detail';
import { DeviceDataProvider } from '../../providers/device-data';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the BgprocessPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bgprocess',
  templateUrl: 'bgprocess.html',
})
export class BgprocessPage {

  devices: any[] = [];
  statusMessage: string;

  constructor(private navCtrl: NavController,
    private toastCtrl: ToastController,
    private ble: BLE,
    private ngZone: NgZone,
    private deviceData: DeviceDataProvider,
    private storage: Storage,
    private backgroundMode: BackgroundMode) {

  }


  scan() {
    // if (!this.backgroundMode.isEnabled) {
    //   this.backgroundMode.enable();
    // }
    if (!this.ble.isEnabled()) {
      this.ble.enable();
    }
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list
    this.ble.scan([], 3).subscribe(
      device => this.onDeviceDiscovered(device),
      error => this.scanError(error)
    );

    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
  }

  onDeviceDiscovered(device) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
    });
  }

  // If location permission is denied, you'll end up here
  scanError(error) {
    this.setStatus('Error ' + error);
    let toast = this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }


  deviceSelected(device) {
    console.log(JSON.stringify(device) + ' selected');
    this.deviceData.setDevice(device);
    //console.log('pushing to details page, device id: ' + device.id);
    this.navCtrl.push(DetailPage);
  }

}


/*
ionViewDidLoad	void	Runs when the page has loaded. This event only happens once per page being created. If a page leaves but is cached, then this event will not fire again on a subsequent viewing. The ionViewDidLoad event is good place to put your setup code for the page.
ionViewWillEnter	void	Runs when the page is about to enter and become the active page.
ionViewDidEnter	void	Runs when the page has fully entered and is now the active page. This event will fire, whether it was the first load or a cached page.
ionViewWillLeave	void	Runs when the page is about to leave and no longer be the active page.
ionViewDidLeave	void	Runs when the page has finished leaving and is no longer the active page.
ionViewWillUnload	void	Runs when the page is about to be destroyed and have its elements removed.
ionViewCanEnter	boolean/Promise<void>	Runs before the view can enter. This can be used as a sort of "guard" in authenticated views where you need to check permissions before the view can enter
ionViewCanLeave	boolean/Promise<void>	Runs before the view can leave. This can be used as a sort of "guard" in authenticated views where you need to check permissions before the view can leave

*/