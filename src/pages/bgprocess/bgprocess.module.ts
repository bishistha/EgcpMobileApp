import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BgprocessPage } from './bgprocess';

@NgModule({
  declarations: [
    BgprocessPage,
  ],
  imports: [
    IonicPageModule.forChild(BgprocessPage),
  ],
  exports: [
    BgprocessPage
  ]
})
export class BgprocessPageModule {}
