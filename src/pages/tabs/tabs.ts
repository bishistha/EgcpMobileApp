import { Component, ViewChild } from '@angular/core';
import { NavController, Tabs, ActionSheetController, App } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ModalController } from 'ionic-angular';
import { BgprocessPage } from '../bgprocess/bgprocess';
import { DetailPage } from '../detail/detail';


@Component({
  templateUrl: 'tabs.html'
})


export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  
  tab4Root = BgprocessPage;
  tab5Root = DetailPage;

  constructor(public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController, public app: App, public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {

    this.navCtrl.viewDidEnter.subscribe((view) => {
      //console.log(view.instance.constructor.name);
    });
  }



  logout() {

    this.app.getRootNav().setRoot(LoginPage);
    //   this.navCtrl.setRoot(LoginPage);
    //   this.navCtrl.setRoot(TabsPage);
    //console.log('LogOut clicked');
  }

}
