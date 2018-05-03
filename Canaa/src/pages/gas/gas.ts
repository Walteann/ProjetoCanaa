import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController,
    ItemSliding } from 'ionic-angular';
import { ListaMercadoriaModels } from '../../modals/lista-mercadoria.models';
import { ComprasHistoricoServiceProvider } from '../../providers/compras-historico-service/compras-historico-service';
import { HomePage } from '../home/home';

@Component({
	selector: 'page-gas',
	templateUrl: 'gas.html',
})
export class GasPage implements OnInit {

	constructor(
		public navCtrl: NavController,
    	public navParams: NavParams,
    	private _alertCtrl: AlertController,
    	private _historicoComprasService: ComprasHistoricoServiceProvider
	) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad GasPage');
	}

	ngOnInit() {}

	public listaDeMercadorias: ListaMercadoriaModels[];

  	public formaPagamento = 'dinheiro';

  	public precoTotal;
  	public Total: number;

	  alertProduto() {
		var alert = this._alertCtrl.create({
		  title: "Adicionar Compra",
		  inputs: [
			{
			  name: "mercadoria",
			  placeholder: "Produto",
			  type: "text"
			},
			{
			  name: "qtd",
			  placeholder: "quantidade",
			  type: "number"
			},
			{
			  name: "precoUni",
			  placeholder: "preco",
			  type: "number"
			}
		  ],
		  buttons: [
			{
			  text: "Cancelar",
			  role: "cancelar",
			  handler: data => {
				console.log("Cancelar foi clicked");
			  }
			},
			{
			  text: "Adicionar",
			  role: "adicionar",
			  handler: data => {
				this.listaDeMercadorias.push(data);
				this.precoTotal = 0;
				this.realizaCalculo();
			  }
			}
		  ]
		});
		alert.present();
	  }
	
	  alertDeletar(produto, itemSli) {
		var alert = this._alertCtrl.create({
		  title: "Remover Produto",
		  message: "Tem certeza que deseja remover " + produto.mercadoria + " ?",
		  buttons: [
			{
			  text: "Não",
			  handler: () => {
				itemSli.close();
			  }
			},
			{
			  text: "Sim",
			  handler: () => {
				this.removeuP(produto);
			  }
			}
		  ]
		});
		alert.present();
	  }
	
	  alertProdutoUpdate(produto, itemSliR) {
		var alert = this._alertCtrl.create({
		  title: "Alterar Compra",
		  inputs: [
			{
			  name: "mercadoria",
			  placeholder: "Produto",
			  type: "text",
			  value: produto.mercadoria
			},
			{
			  name: "qtd",
			  placeholder: "quantidade",
			  type: "number",
			  value: produto.qtd
			},
			{
			  name: "precoUni",
			  placeholder: "preco",
			  type: "text",
			  value: produto.precoUni
			}
		  ],
		  buttons: [
			{
			  text: "Cancelar",
			  role: "cancelar",
			  handler: data => {
				itemSliR.close();
			  }
			},
			{
			  text: "Atualizar",
			  role: "atualizar",
			  handler: data => {
				var index = this.listaDeMercadorias.indexOf(produto);
				this.listaDeMercadorias[index].mercadoria = data.mercadoria;
				this.listaDeMercadorias[index].qtd = data.qtd;
				this.listaDeMercadorias[index].precoUni = data.precoUni;
	
				this.precoTotal = 0;
				this.realizaCalculo();
	
				itemSliR.close();
			  }
			}
		  ]
		});
		alert.present();
	  }
	
	  alertProdutoFinalizado(listaDeProdutos) {
		var alert = this._alertCtrl.create({
		  title: "Pedido",
		  message:
		    "Pedido realizado com sucesso!",
		  buttons: [
			{
			  text: "SIM",
			  handler: data => {
				  this.salvarCompras();
			  }
			}
		  ]
		});
		alert.present();
	  }
	
	  addProduto() {
		this.alertProduto();
	  }
	
	  removerProduto(produto, itemSli: ItemSliding) {
		this.alertDeletar(produto, itemSli);
	  }
	
	  removeuP(produto) {
		this.listaDeMercadorias.splice(this.listaDeMercadorias.indexOf(produto), 1);
		this.precoTotal = 0;
		this.realizaCalculo();
	  }
	
	  atualizarProduto(produto, itemSli: ItemSliding) {
		this.alertProdutoUpdate(produto, itemSli);
	  }
	
	  realizaCalculo() {
		for (let i = 0; i < this.listaDeMercadorias.length; i++) {
		  this.precoTotal +=
			this.listaDeMercadorias[i].precoUni * this.listaDeMercadorias[i].qtd;
		}
		this.Total = this.precoTotal.toFixed(2);
	  }
	
	  produtoFinalizado(lista) {
		this.alertProdutoFinalizado(lista);
	  }
	
	  salvarCompras()   {
			this.navCtrl.push(HomePage);	
	  }
	
	  enviandoParaBanco(arrayHistorico){
		  console.log(arrayHistorico);
		  this._historicoComprasService.setHistorico(arrayHistorico)
			.subscribe( data =>   {
				console.log(data + ' Esse objeto foi adicionado');
				this.navCtrl.push(HomePage);
			});
	
	  }


}
