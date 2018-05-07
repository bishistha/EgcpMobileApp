import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


// import { Badge } from '@ionic-native/badge'
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
  //template: '<ion-nav #myNav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  //@ViewChild('myNav') nav
  rootPage: any = TabsPage;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    //   this.badge.clear();


      //TODO call 





      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
