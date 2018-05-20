import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnderecoPage } from './endereco';

@NgModule({
  declarations: [
    EnderecoPage,
  ],
  imports: [
    IonicPageModule.forChild(EnderecoPage),
  ],
})
export class EnderecoPageModule {}
