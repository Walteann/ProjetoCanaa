import { Injectable, NgZone } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";

import { GasModel } from './gas.model';

@Injectable()
export class GasService {

    gasLista: AngularFireList<any>;
    gasSelecionado: GasModel = new GasModel();
    usuarioUid: any;

    constructor(
        private firebase: AngularFireDatabase, private angularFireAuth: AngularFireAuth
    ) {
        angularFireAuth.authState.subscribe(user => {
            this.usuarioUid = user.uid;
            // this.enderecoList = db.list(PATH);
        });
    }

    getData() {
        this.gasLista = this.firebase.list('novosPedidos');
        return this.gasLista;
    }

    adicionarGas(gas: GasModel) {
        console.log(gas);
        this.gasLista.push({
            marca: gas.marca,
            novoRetornavel: gas.novoRetornavel,
            uidUsuario: this.usuarioUid,            
            quantidade: gas.quantidade,
            formaPagamento: gas.formaPagamento,
            troco: gas.troco,
            valorTroco: gas.valorTroco,
            valorUnitario: gas.valorUnitario,
            total: gas.total,
            dataPedido: gas.dataPedido,
            tipoObjeto: gas.tipoObjeto,
            hora: gas.hora
        });
    }

    updateEmployee(gas: GasModel) {
        this.gasLista.update(gas.$key, {
            marca: gas.marca,
            novoRetornavel: gas.novoRetornavel,
            uidUsuario: this.usuarioUid,
            quantidade: gas.quantidade,
            formaPagamento: gas.formaPagamento,
            troco: gas.troco,
            valorTroco: gas.valorTroco,
            valorUnitario: gas.valorUnitario,
            total: gas.total,
            dataPedido: gas.dataPedido,
            tipoObjeto: gas.tipoObjeto,
            hora: gas.hora
        });
    }

    deleteEmployee($key: string) {
        this.gasLista.remove($key);
    }
}
