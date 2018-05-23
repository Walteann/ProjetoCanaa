import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Endereco } from './endereco.model';

@Injectable()
export class EnderecoService {
    PATH: any;
    enderecoList: AngularFireList<any>;
    enderecoSelected: Endereco = new Endereco();

    constructor(private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth) {
        angularFireAuth.authState.subscribe(user => {
            this.PATH = '/usuarios/' + user.uid;
        });
    }

    // public getAll() {
    //     console.log(this.items);
    //     return this.items;
    // }

    public getAll() {
        return this.db.list(this.PATH)
        .snapshotChanges()
        .map(changes => {
            return changes.map(c => ({key: c.payload.key, ...c.payload.val() }));
        })
    }
    public adicionarEndereco(usuarioEndereco: any) {
           return this.enderecoList.push({
                nome: usuarioEndereco.nome,
                cpf: usuarioEndereco.cpf,
                celular: usuarioEndereco.celular,
                cep: usuarioEndereco.cep,
                endereco: usuarioEndereco.endereco,
                cidade: usuarioEndereco.cidade,
                complemento: usuarioEndereco.complemento,
                bairro: usuarioEndereco.bairro
            });
    } 
    
    public updateEndereco(usuarioEndereco: any) {
        return this.enderecoList.update(usuarioEndereco.key, {
            nome: usuarioEndereco.nome,
            cpf: usuarioEndereco.cpf,
            celular: usuarioEndereco.celular,
            cep: usuarioEndereco.cep,
            endereco: usuarioEndereco.endereco,
            cidade: usuarioEndereco.cidade,
            complemento: usuarioEndereco.complemento,
            bairro: usuarioEndereco.bairro
        });
    }

    public remove(key: string) {
        return this.enderecoList.remove(key);
    }

}