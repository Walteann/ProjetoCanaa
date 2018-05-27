import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Endereco } from '../../providers/endereco/endereco.model';
import { HomePage } from '../home/home';
@IonicPage()
@Component({
    selector: 'page-endereco',
    templateUrl: 'endereco.html',
})
export class EnderecoPage {
    title: string;
    form: FormGroup;
    endereco: Endereco;
    ok: any;
    userMAIL: any;
    PATH: any;
    USER: any;
    enderecoList: AngularFireList<any>;
    usuarioSemFoto = 'https://www.cloudninefertility.com/wp-content/uploads/2017/12/User-dummy.png';

    private setupPageTitle() {
        this.title = this.navParams.data.endereco ? 'Atualizar Endereço' : 'Cadastrar novo Endereço';
    }

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth,
        private loadCtrl: LoadingController, private toast: ToastController,
        private formBuilder: FormBuilder
    ) {
        angularFireAuth.authState.subscribe(user => {
            this.PATH = '/usuarios/' + user.uid;
        });
        this.endereco = this.navParams.get('endereco') || {};
        this.userMAIL = this.navParams.get('userLog') || {};

        if (this.navParams.get('user')) {
            this.USER = this.navParams.get('user');

            this.userMAIL.email = this.USER.email;
            this.userMAIL.displayName = this.USER.displayName;
            this.userMAIL.phoneNumber = this.USER.phoneNumber;
            this.userMAIL.photoURL = this.USER.photoURL;
            this.userMAIL.uid = this.USER.uid;
        }
        if (this.userMAIL.displayName) {
            this.endereco.nome = this.userMAIL.displayName;
        }

        if (this.userMAIL.photoURL === this.usuarioSemFoto) {
            this.userMAIL.photoURL = this.usuarioSemFoto;
        } else if (this.userMAIL.photoURL !== this.usuarioSemFoto) {
            this.userMAIL.photoURL = this.userMAIL.photoURL;
        }
        if (!this.userMAIL.photoURL) {
            this.userMAIL.photoURL = this.usuarioSemFoto;
        }

        this.setupPageTitle();

    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad EnderecoPage');
    }

    onSubmit() {
        let load = this.loadCtrl.create({
            spinner: 'crescent',
        });
        load.present();
        this.sendFirebase(this.endereco)
            .then(() => {
                this.toast.create({ message: 'Endereço salvo com sucesso.', duration: 3000 }).present();
                load.dismiss();
            }).catch((e) => {
                this.toast.create({ message: 'Erro ao salvar o endereço.', duration: 3000 }).present();
                console.error(e);
                load.dismiss();
            })
    }

    voltarHome() {
        this.navCtrl.setRoot(HomePage);
    }


    // Parte do servico

    getAll() {
        return this.db.list(this.PATH).snapshotChanges()
            .map(changes => {
                return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
            })
    }

    get(key: string) {
        return this.db.object(this.PATH + key).snapshotChanges()
            .map(c => {
                return { key: c.key, ...c.payload.val() };
            });
    }


    sendFirebase(usuarioEndereco: Endereco) {
        return new Promise((resolve, reject) => {
            if (usuarioEndereco.key) {
                this.db.list(this.PATH + '/enderecos')
                    .update(
                        usuarioEndereco.key, {
                            nome: usuarioEndereco.nome,
                            cpf: usuarioEndereco.cpf,
                            celular: usuarioEndereco.celular,
                            cep: usuarioEndereco.cep,
                            endereco: usuarioEndereco.endereco,
                            cidade: usuarioEndereco.cidade,
                            complemento: usuarioEndereco.complemento,
                            bairro: usuarioEndereco.bairro,
                            user: usuarioEndereco.user
                        }
                    )
                    .then(() => {
                        resolve();
                        this.navCtrl.setRoot(HomePage);
                    })
                    .catch((e) => reject(e));
            } else {
                this.db.list(this.PATH + '/enderecos')
                    .push({
                        nome: usuarioEndereco.nome,
                        cpf: usuarioEndereco.cpf,
                        celular: usuarioEndereco.celular,
                        cep: usuarioEndereco.cep,
                        endereco: usuarioEndereco.endereco,
                        cidade: usuarioEndereco.cidade,
                        complemento: usuarioEndereco.complemento,
                        bairro: usuarioEndereco.bairro,
                        user: this.userMAIL


                    })
                    .then(() => {
                        resolve()
                        this.navCtrl.setRoot(HomePage);
                    });
            }
        })
    }

}
