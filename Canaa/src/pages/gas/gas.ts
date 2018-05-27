import { Component, OnInit } from '@angular/core';
import {
    NavController, NavParams, AlertController,
    ItemSliding
} from 'ionic-angular';
import { HomePage } from '../home/home';
import { NgForm } from '@angular/forms';
import { GasModel } from './gas.model';
import { GasService } from './gas.service';

@Component({
    selector: 'page-gas',
    templateUrl: 'gas.html',
})
export class GasPage implements OnInit {

    gasFormulario: GasModel = new GasModel();
    isTroco: boolean = true;    
    valorDoGas: number;
    selecionado = {
        valor: 'retornavel'
    };

    marcaGas = [
        { valor: 'ultragas', marca: 'Ultragás'},
        { valor: 'liquigas', marca: 'Liquigás'},
        { valor: 'copergas', marca: 'Copergás'}
    ];


    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private _alertCtrl: AlertController,
        private _gasService: GasService
        
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GasPage');
    }

    ngOnInit() {
        this._gasService.getData();
        this.gasFormulario = new GasModel();
        this.gasFormulario.marca = '';
        this.gasFormulario.troco = false;
        this.gasFormulario.statusPedido = 'novo';        
        this.gasFormulario.valorTroco = 0;
        
    }
 
    salvarCompras() {
        this.navCtrl.setRoot(HomePage);
    }

    habilitaTroco() {
        if (this.gasFormulario.troco === true) {
            this.isTroco = false;
            this.gasFormulario.valorTroco = 0;
        } else if (this.gasFormulario.troco === false) {
            this.isTroco = true;
            this.gasFormulario.valorTroco = 0;
        }
    }

    atribuirValor(valor?: string) {
        if (valor === 'retornavel') {
            this.gasFormulario.valorUnitario = 67.99;
            this.gasFormulario.total = this.gasFormulario.valorUnitario * this.gasFormulario.quantidade;
            this.gasFormulario.total = +this.gasFormulario.total.toFixed(2);
        } else if (valor === 'novo') {
            this.gasFormulario.valorUnitario = 169.99;
            this.gasFormulario.total = this.gasFormulario.valorUnitario * this.gasFormulario.quantidade;
            this.gasFormulario.total = +this.gasFormulario.total.toFixed(2);
        }
    }

    finalizaPedido() {
        let alert = this._alertCtrl.create({
            title: 'Confirmação de Pedido',
            message: 'Deseja finalizar pedido?',
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'Finalizar',
                handler: () => {
                  this.realizaPedido();
                }
              }
            ]
          });
          alert.present();
    }

    realizaPedido() {
        let timestamp = Date.now();
        var dataP = new Date(timestamp);
        let hora = new Date();

        this.gasFormulario.dataPedido = dataP.toLocaleDateString('pt-BR');
        this.gasFormulario.hora = hora.getHours() + ':' + hora.getMinutes() + ':' + hora.getSeconds();
        this.gasFormulario.tipoObjeto = 'Gás';
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
