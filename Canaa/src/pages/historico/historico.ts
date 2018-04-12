import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';

import { IHistoricoComprasModels } from '../../modals/historico-compras.models';
import { LoginPage } from '../login/login';
import { Observable } from 'rxjs/Observable';

import { ComprasHistoricoServiceProvider } from '../../providers/compras-historico-service/compras-historico-service';
@Component({

	templateUrl: 'historico.html',
})
export class HistoricoPage implements OnInit {

	public historicoHash: IHistoricoComprasModels[];



	constructor(public navCtrl: NavController, 
		private _historicoService: ComprasHistoricoServiceProvider,
		private _modal: ModalController,
		private _alertCtrl: AlertController
	) {


	}

	ngOnInit() {
		this.buscarHistorico();
	}

	buscarHistorico(): void	{

		this._historicoService.getHistorico()
			.subscribe( data =>	{
				this.historicoHash = data;
			});


	}

	showHistorico(historicoHasheado)	{

		var historicoString = atob(historicoHasheado.historico);
		var historicoObjeto = JSON.parse(historicoString);
		const meuModal = this._modal.create('HistoricoModalPage', { objeto: historicoObjeto});

		meuModal.present();
	}

	meuAlert(titulo, subTitulo) {
        let alert = this._alertCtrl.create({
            title: titulo,
            subTitle: subTitulo,
            buttons: [
				{ 
					text: 'OK',
					handler: () => {
						this.levarParaLogin();
					}
				}
			]
        });
        alert.present();
    }

	cadastrarUsuario() {
		let tituloT = 'Cadastro';
		let subTituloT = 'Usuario Cadastrado com sucesso!';
		this.meuAlert(tituloT, subTituloT);
	}

	levarParaLogin() {
		this.navCtrl.setRoot(LoginPage);
	}


}
