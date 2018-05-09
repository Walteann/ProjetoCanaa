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

import { GasModel } from './../gas/gas.model';
import { GasService } from './../gas/gas.service';


@Component({
    selector: "page-ambiente-compras",
    templateUrl: "ambiente-compras.html"
})
export class AmbienteComprasPage implements OnInit {
    public listaDeMercadorias: ListaMercadoriaModels[];

    public formaPagamento = 'dinheiro';
    gasFormulario: GasModel = new GasModel();
    valorDoGas: number;
    selecionado = {
        valor: 'retornavel'
    };
    marcaAgua = [
        { valor: 'cristal', marca: 'Cristal' },
        { valor: 'santaJoana', marca: 'Santa Joana' },
        { valor: 'indaia', marca: 'Indaia' },
        { valor: 'prataDoVale', marca: 'Prata do Vale' }
    ]

    dataPedido: any;


    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private _alertCtrl: AlertController,
        private _historicoComprasService: ComprasHistoricoServiceProvider,
        private _gasService: GasService
    ) { }

    ionViewDidLoad() {
        console.log("ionViewDidLoad AmbienteComprasPage");
    }

    ngOnInit() {
        this._gasService.getData();
        this.gasFormulario = new GasModel();
        this.gasFormulario.marca = '';
        this.gasFormulario.troco = false;
    }


    salvarCompras() {
        this.navCtrl.setRoot(HomePage);
    }

    // aparti daqui
    atribuirValor(valor?: string) {
        if (valor === 'retornavel') {
            this.gasFormulario.valorUnitario = 3.99;
            this.gasFormulario.total = this.gasFormulario.valorUnitario * this.gasFormulario.quantidade;
            this.gasFormulario.total = +this.gasFormulario.total.toFixed(2);
        } else if (valor === 'novo') {
            this.gasFormulario.valorUnitario = 11.99;
            this.gasFormulario.total = this.gasFormulario.valorUnitario * this.gasFormulario.quantidade;
            this.gasFormulario.total = +this.gasFormulario.total.toFixed(2);
        }
    }

    realizaPedido() {
        let timestamp = Date.now();
        var dataP = new Date(timestamp);
        let hora = new Date();

        this.gasFormulario.dataPedido = dataP.toLocaleDateString('pt-BR');
        this.gasFormulario.hora = hora.getHours() + ':' + hora.getMinutes() + ':' + hora.getSeconds();
        this.gasFormulario.tipoObjeto = 'Água';
        this._gasService.adicionarGas(this.gasFormulario);
        var alert = this._alertCtrl.create({
            title: "Pedido",
            message:
                "Pedido realizado com sucesso!",
            buttons: [
                {
                    text: "OK",
                    handler: data => {
                        this.salvarCompras();
                    }
                }
            ]
        });
        alert.present();
    }

}
