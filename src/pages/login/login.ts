import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Tabs, AlertController } from 'ionic-angular';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { DOCUMENT } from '@angular/platform-browser';
import { LoginProvider } from '../../providers/login/login';
import { Common } from '../../providers/common';
import { ENV } from '@environment';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  // public usr: string = 'a';
  // public pwd: string = 'p';
  public usr: string;
  public pwd: string;
  isChecked: boolean = false;
  keyboardShow: boolean = false;
  privacyStatementAccepted: boolean = false;
  public privacyAccepted: boolean = null;

  constructor(private login: LoginProvider,
    public navCtrl: NavController,
    public storage: Storage,
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    private common: Common) {
    this.storage.get('username').then((val) => {
      if (val === '') {
        this.isChecked = false;
      }
      else {
        this.isChecked = true;
      }
    });
    this.privacyAccepted = null;


  }

  ionViewWillEnter() {
    //console.log('ionViewDidLoad LoginPage');
    //document.querySelector('.tabbar').setAttribute('style', 'display:none');

  }


  userLogin() {
    this.navCtrl.push(TabsPage);
  }



}
