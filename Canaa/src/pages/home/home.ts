import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AmbienteComprasPage } from '../ambiente-compras/ambiente-compras';
import { ListaProdutosComponent } from '../listaProdutos/lista-produtos.component';
import { HistoricoPage } from '../historico/historico';
import { GasPage } from '../gas/gas';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage implements OnInit {


	public menu_inicial = [];

	public itemDoMenu = [];

	public menuR: string;


	constructor(public navCtrl: NavController) {

		this.menu_inicial = [
			{ 
				componenteMenu: AmbienteComprasPage, 
				nomeMenu: 'Butijão de Agua',
				urlImg: "assets/imgs/agua.png", 
				descricaoMenu: 'Butijao de Agua', 
				iconeIos: 'ios-cart', iconeMd: 'md-cart' 
			},
			{ 
				componenteMenu: GasPage, 
				nomeMenu: 'Butijão de Gás', 
				urlImg: "assets/imgs/gas.png", 				
				descricaoMenu: 'Butijao de Gás', 
				iconeIos: 'ios-cart', iconeMd: 'md-cart' 
			}
			
		];
	}


	ngOnInit() {

	}

	menuSelecionado(componenteR): void {

		this.navCtrl.push(componenteR);

	}

}




