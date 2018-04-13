import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AmbienteComprasPage } from '../ambiente-compras/ambiente-compras';
import { ListaProdutosComponent } from '../listaProdutos/lista-produtos.component';
import { HistoricoPage } from '../historico/historico';
import { GasPage } from '../gas/gas';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage implements OnInit {
	public Permissao: boolean;
	public mostra = false;
	public menu_inicial = [];

	public itemDoMenu = [];

	public menuR: string;


	constructor(
		public navCtrl: NavController,
		private _navParams: NavParams
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

}




