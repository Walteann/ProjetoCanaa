import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the HistoricoModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historico-modal',
  templateUrl: 'historico-modal.html',
})
export class HistoricoModalPage {

  public dados = [];

  constructor( private _navParams: NavParams, private view: ViewController) {
  }

  fecharModal() {
    this.view.dismiss();
  }

  ionViewWillLoad() {
    const data = this._navParams.get('objeto');
    this.dados = data;

  }

}
