import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { BackgroundMode } from '@ionic-native/background-mode';
import { MyApp } from './app.component';
import { BLE } from '@ionic-native/ble';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { BgprocessPage } from '../pages/bgprocess/bgprocess';
import { DetailPage } from '../pages/detail/detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginProvider } from '../providers/login/login';
import { HttpModule } from '@angular/http';
import { HttpClient } from '../providers/http-client';
import { HttpHelper } from '../providers/http-helpers';
import { Common } from '../providers/common';
import { DeviceDataProvider } from '../providers/device-data';
// import { Device } from '@ionic-native/device';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { InAppBrowser } from '@ionic-native/in-app-browser';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BgTask } from '../providers/bg-task';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { CallNumber } from '@ionic-native/call-number';


// import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

// const cloudSettings: CloudSettings = {
//   'core': {
//     'app_id': 'APP_ID'
//   }
// };


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    BgprocessPage,
    DetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
    // CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    BgprocessPage,
    DetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginProvider,
    HttpClient,
    HttpHelper,
    Common,
    IonicStorageModule,
    // Device,
    // InAppBrowser,
    BluetoothSerial,
    DeviceDataProvider,
    BackgroundMode,
    BLE,
    BgTask,
    LocalNotifications,
    CallNumber
  ]
})
export class AppModule { }
