import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { Common } from '../../providers/common'
// import { PushObject, PushOptions } from '@ionic-native/push';
import { Platform } from 'ionic-angular';
import { DeviceDataProvider } from '../../providers/device-data';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { CallNumber } from '@ionic-native/call-number';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  rootPage: any = LoginPage;
  data: string = '';

  constructor(private navController: NavController,
    private navParams: NavParams,
    private common: Common,
    public platform: Platform,
    private loadingController: LoadingController,
    private alertCtrl: AlertController,
    public deviceDataProvider: DeviceDataProvider,
    private localNotification: LocalNotifications,
    private callNumber: CallNumber) {

    this.data = this.deviceDataProvider.getData();
    
  }

  notify(notification) {
    let json = JSON.parse(notification.data);
    let alert = this.alertCtrl.create({
      title: notification.title,
      subTitle: json.mydata
    });
    alert.present();
  }

  failure(err) {
    console.log("Error while tying to notify: " + err);
  }

  scheduleNotification() {
    // events schedule, trigger, click, update, clear, clearall, cancel, cancelall
    this.localNotification.schedule({
      id: 1,
      title: 'Attention',
      text: 'Test notification',
      trigger: { at: new Date(new Date().getTime()) },
      data: { mydata: 'This is a test notification'}
    });

    if(!this.platform.is('cordova')){
      this.platform.ready().then((rdy) => {
        this.localNotification.on('click').subscribe(
          this.notify,
          this.failure
        );
      });
    }

  }

  scheduleNotificationForWarning() {
    // events schedule, trigger, click, update, clear, clearall, cancel, cancelall
    this.localNotification.schedule({
      id: 1,
      title: 'Attention!!!',
      text: 'Child passanger still inside the vehicle',
      trigger: { at: new Date(new Date().getTime() + 5000) },
      data: { mydata: 'Car cabin has unsuitable condition for the passanger Child. Please return to your vehicle.'}
    });

    if(!this.platform.is('cordova')){
      this.platform.ready().then((rdy) => {
        this.localNotification.on('click').subscribe(
          this.notify,
          this.failure
        );
      });
    }

  }

  ionViewCanEnter() {
    //console.log("is logged in", this.borrowerProvider.getIsLogin());

  }

  ionViewDidLoad() {

  }

  callPolice(){
    if(this.callNumber.isCallSupported()){
      this.callNumber.callNumber("911", true);
    } else {
      let alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Couldn't Call."
      });
      alert.present();
    }
  }


}

























