import { Injectable } from '@angular/core';
import { Component, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble';
import { AlertController } from 'ionic-angular';
import { DeviceDataProvider } from './device-data';
import { BackgroundMode } from '@ionic-native/background-mode';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Storage } from '@ionic/storage';

// Bluetooth UUIDs
const PI_SERVICE = 'ffe0';
const PI_DATA_CHARACTERISTIC = 'ffe1';
const PI_DEVICE_ID = "XX:XX:XX:XX:XX:XX";

@Injectable()
export class BgTask {

    statusMessage: string;
    //peripheral: any = {};
    //devices: any[] = [];

    constructor(
        private ble: BLE,
        private alertCtrl: AlertController,
        private ngZone: NgZone,
        private deviceData: DeviceDataProvider,
        private backgroundMode: BackgroundMode,
        private storage: Storage) {
        // this.storage.key
        // let device = deviceData.getDevice();
        // if (device) {
        //     this.setStatus('Connecting to ' + device.name || device.id);
        //     this.ble.connect(device.id).subscribe(
        //         peripheral => this.onConnected(peripheral),
        //         peripheral => this.showAlert('Disconnected', 'The peripheral unexpectedly disconnected')
        //     );
        // }
    }

    scan() {
        //this.ble.isConnected(device)
        console.log("#### Scanning for bluetooth LE devices...");
        this.setStatus('Scanning for Bluetooth LE Devices');
        //this.devices = [];  // clear list
        this.ble.scan([], 6).subscribe(
            this.onScanSuccess,
            error => this.scanError(error)
        );
        //setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
    }

    onScanSuccess(device) {
        this.storage.get('mobiledeviceId').then(
            (deviceId) => {
                console.log("#### On Scan success...");
                if (device.id == deviceId) {
                    console.log("### Device found...");
                    this.onDeviceDiscovered(device);
                }
            }
        );
    }

    onDeviceDiscovered(device) {
        console.log('#### Discovered ' + JSON.stringify(device, null, 2));
        this.ngZone.run(() => {
            this.ble.connect(device.id).subscribe(
                this.onConnected,
                this.scanError
            );
        });
    }

    // the connection to the peripheral was successful
    onConnected(peripheral) {
        console.log("#### Successfully connected to the device...");
        this.setStatus('Connected to ' + (peripheral.id));
        this.onNotification(peripheral.id);
    }

    onNotification(deviceId) {
        console.log("#### Pi is notifying the app now...");
        this.ble.startNotification(deviceId, PI_SERVICE, PI_DATA_CHARACTERISTIC).subscribe(
            data => this.onDataReceive(data),
            () => console.log('Unexpected Error. Failed to subscribe for data state changes!')
        )
    }
    

    onDataReceive(buffer: ArrayBuffer) {
        console.log("#### Data received from the pi...");
        var data = new Uint8Array(buffer);
        console.log(">> DATA[0]: " + data[0]);
        this.ngZone.run(() => {
            this.deviceData.setData(data[0]);
            // WRITE AN OBERSABLE THAT UI CAN SUBSCRIBE TO
        });

    }

    scanError(error) {
        console.log("Error while scanning..." + error);
        this.setStatus('Error ' + error);
    }

    showAlert(title, message) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

    setStatus(message) {
        console.log(message);
        this.ngZone.run(() => {
            this.statusMessage = message;
        });
    }


    PollForData() {
        if (!this.backgroundMode.isEnabled) {
            this.backgroundMode.enable();
        }
        if (!this.ble.isEnabled()) {
            this.ble.enable();
        }
        // also need to check if deviceId is checked. Is it first time? if yes, skip this step. else, connect.
        this.storage.get('mobiledeviceId').then(
            (deviceId) => {
                if (!this.ble.isConnected(deviceId)) {
                    console.log("Since Device is not connected to the LE device...");
                    setInterval(() => {
                        this.scan();
                    }, 6000);
                } else {
                    // READ
                    this.onNotification(deviceId);
                }

            }
        );
    }

    // check if bgmode is enabled. if not enable it.
    // check if im already connected to that device. if its true, start reading. if not then check bt is on or off..scan, discover, connect, read.
}
