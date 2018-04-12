import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
	selector: 'page-esqueci-senha',
	templateUrl: 'esqueci-senha.html',
})
export class EsqueciSenhaPage implements OnInit {

	public cpf: any;
	public email: any;


	constructor(public navCtrl: NavController, public navParams: NavParams,
		private _alertCtrl: AlertController) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad EsqueciSenhaPage');
	}

	ngOnInit() {

	}

	meuAlert(titulo, subTitulo) {
        let alert = this._alertCtrl.create({
            title: titulo,
            subTitle: subTitulo,
			buttons: [{ text: 'OK',
			handler: () => {
				this.levarParaLogin();
			}
		}]
        });
        alert.present();
    }

	recuperarSenha() {
		let tituloT =  'Recuperar Senha';
		let subTituloT =  'A nova Senha foi enviada por Email';
		this.meuAlert(tituloT, subTituloT);
	}

	
	levarParaLogin() {
		this.navCtrl.setRoot(LoginPage);
	}



}
