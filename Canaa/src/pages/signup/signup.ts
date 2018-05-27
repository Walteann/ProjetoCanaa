import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth/user';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService } from '../../providers/auth/auth.service';
import { EnderecoPage } from '../endereco/endereco';
import { Usuario } from '../../providers/endereco/usuario.model';

@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {
    listaUsuarios: AngularFireList<any>
    
    user: User = new User();
    @ViewChild('form') form: NgForm

  userEmail: Usuario;
    

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private authService: AuthService,
        private loadCtrl: LoadingController,
        private toastCtrl: ToastController,
        private db: AngularFireDatabase,
    ) {
        this.listaUsuarios = this.db.list('listaUsuarios');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SignupPage');
    }

    criarConta() {
        if (this.form.form.valid) {
            let toast = this.toastCtrl.create({
                duration: 5000, position: 'middle'
            });
            let load = this.loadCtrl.create({
                spinner: 'crescent',
            });
            load.present();
            this.authService.signUp(this.user)
                .then((user: any) => {
                    console.log(user);
                    toast.setMessage('Usuário Registrado com sucesso!, por favor adicione um endereço para entrega.');
                    toast.present();
                    this.navCtrl.setRoot(EnderecoPage, {user: user });
                    load.dismiss();
                    this.listaUsuarios.push({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        phoneNumber: user.phoneNumber,
                        photoURL: user.photoURL
                    });
                })
                .catch((error: any) => {

                    if (error.code == 'auth/email-already-in-use') {
                        toast.setMessage('O email digitado já está em uso');
                    } else if (error.code == 'auth/invalid-email') {
                        toast.setMessage('O email digitado não é valido');
                    } else if (error.code == 'auth/operation-not-allowed') {
                        toast.setMessage('Não está habilitado criar usuarios');
                    } else if (error.code == 'auth/weak-password') {
                        toast.setMessage('A senha digitada é muito fraca');
                    }
                    toast.present();
                    load.dismiss();
                });
        }
    }

}
