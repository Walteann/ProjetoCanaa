import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AmbienteComprasPage } from '../ambiente-compras/ambiente-compras';
import { GasPage } from '../gas/gas';
import { AuthService } from '../../providers/auth/auth.service';
import { SigninPage } from '../signin/signin';
import { Usuario } from '../../providers/endereco/usuario.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { EnderecoPage } from '../endereco/endereco';
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage implements OnInit {
	public Permissao: boolean;
	public mostra = false;
	public menu_inicial = [];
	listagem: any;
	public itemDoMenu = [];
	public menuR: string;
	PATH: any;
	userEmail: Usuario;
	public logoUrl = 'assets/imgs/Canaa.fw.png';


	constructor(
		public navCtrl: NavController,
		private _navParams: NavParams,
		private authService: AuthService,
		private afAuth: AngularFireAuth, private db: AngularFireDatabase,
		private loadCtrl: LoadingController
	) {

		

		this.menu_inicial = [
			{
				componenteMenu: AmbienteComprasPage,
				nomeMenu: 'Butijão de Agua',
				urlImg: "assets/imgs/agua.fw.png",
				descricaoMenu: 'Butijao de Agua',
				iconeIos: 'ios-cart', iconeMd: 'md-cart'
			},
			{
				componenteMenu: GasPage,
				nomeMenu: 'Butijão de Gás',
				urlImg: "assets/imgs/gas.fw.png",
				descricaoMenu: 'Butijao de Gás',
				iconeIos: 'ios-cart', iconeMd: 'md-cart'
			}

		];

		const authObserver = afAuth.authState.subscribe(user => {
			if (user) {
				this.userEmail = {};
				this.PATH = '/usuarios/' + user.uid;

				this.userEmail.email = user.email;
				this.userEmail.displayName = user.displayName;
				this.userEmail.phoneNumber = user.phoneNumber;
				this.userEmail.photoURL = user.photoURL;
				this.userEmail.uid = user.uid;
			}
		})
	}


	ngOnInit() {

		this.Permissao = this._navParams.get("permissao");
		if (this.Permissao == true) {
			this.mostra = true;
		} else {
			this.mostra = false
		}
	}

	menuSelecionado(componenteR): void {

		this.navCtrl.push(componenteR);

	}

	signOut() {
		this.authService.signOut()
			.then(() => {
				this.navCtrl.setRoot(SigninPage);
			}).catch((error) => {
				console.error(error);
			});
	}

	paginaEndereco() {
		let load = this.loadCtrl.create({
			spinner: 'crescent',
		});
		load.present();
		this.db.list(this.PATH + '/enderecos').snapshotChanges()
			.map(changes => {
				return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
			}).subscribe(data => {
				this.listagem = data[0];
				load.dismiss();
				this.navCtrl.push(EnderecoPage, { endereco: this.listagem, userLog: this.userEmail });
				console.log('entrei aqui');
				console.log(this.userEmail);
				// this.load.dismiss();
			});
	}

}




