import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoModalPage } from './historico-modal';

@NgModule({
  declarations: [
    HistoricoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricoModalPage),
  ],
})
export class HistoricoModalPageModule {}
