import { HistoricoAddModels } from './../../modals/historico-add.models';
import { Component, OnInit } from "@angular/core";
import {
    NavController,
    NavParams,
    AlertController,
    ItemSliding
} from "ionic-angular";

import { HomePage } from '../home/home';
import { ListaMercadoriaModels } from "../../modals/lista-mercadoria.models";
import { IHistoricoComprasModels } from './../../modals/historico-compras.models';

import { ComprasHistoricoServiceProvider } from './../../providers/compras-historico-service/compras-historico-service';




@Component({
  selector: "page-ambiente-compras",
  templateUrl: "ambiente-compras.html"
})
export class AmbienteComprasPage implements OnInit {
  public listaDeMercadorias: ListaMercadoriaModels[];

  public formaPagamento = 'dinheiro';

  public precoTotal;
  public Total: number;

  public historicoCompra: IHistoricoComprasModels[];


  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private _alertCtrl: AlertController,
      private _historicoComprasService: ComprasHistoricoServiceProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad AmbienteComprasPage");
  }

  ngOnInit() {
    this.listaDeMercadorias = [
      {
        mercadoria: "Feijao",
        qtd: 2,
        precoUni: 1.0
      },
      {
        mercadoria: "Arroz",
        qtd: 2,
        precoUni: 3.0
      },
      {
        mercadoria: "Macarrao",
        qtd: 5,
        precoUni: 1.25
      }
    ];

    this.precoTotal = 0.0;
    this.Total = 0.0;
    this.realizaCalculo();
  }

  

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
      title: "Endereço de Entrega",
      // message:
      //   "Endereco de Entrega",
       inputs: [
           {

               name: 'nomeacao',
               type: 'text',
               placeholder: 'Informe o Endereço'
           },
           {

               name: 'numeroCelular',
               type: 'number',
               placeholder: 'numero celular'
           }
       ],
      buttons: [
        {
          text: "NÃO",
          handler: () => {

          }
        },
        {
          text: "SIM",
          handler: data => {
              this.salvarCompras(listaDeProdutos, data.nomeacao);
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

  salvarCompras(listaRecebida, nomeDaCompra)   {

    let listaString = listaRecebida;
    let listaJson = JSON.stringify(listaString);

    var listaCodificada = window.btoa(listaJson);
    console.log(listaCodificada);
    console.log(nomeDaCompra);

    var Hist = [{nome: nomeDaCompra, hist: listaCodificada }]

    this.enviandoParaBanco(Hist);
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
