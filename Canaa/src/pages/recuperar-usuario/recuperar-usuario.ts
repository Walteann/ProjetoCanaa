import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth.service';

@IonicPage()
@Component({
    selector: 'page-recuperar-usuario',
    templateUrl: 'recuperar-usuario.html',
})
export class RecuperarUsuarioPage {
    userEmail: string = '';
    @ViewChild('form') form: NgForm;

    constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
        private _alertCtrl: AlertController, private authService: AuthService, private loadCtrl: LoadingController
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RecuperarUsuarioPage');
    }

    resetPassword() {
        if (this.form.form.valid) {
            let toast = this.toastCtrl.create({
                duration: 3000, position: 'buttom'
            });

            let load = this.loadCtrl.create({
                spinner: 'crescent',
            });
            load.present();

            this.authService.resetPassword(this.userEmail)
                .then(() => {
                    toast.setMessage('Solicitação foi enviada para o seu email');
                    toast.present();
                    load.dismiss();

                    this.navCtrl.pop();
                })
                .catch((error) => {
                    if (error.code == 'auth/invalid-email') {
                        toast.setMessage('O email digitado não é valido');
                    } else if (error.code == 'auth/user-not-found') {
                        toast.setMessage('O usuario não foi encontrado');
                    }

                    toast.present();
                    load.dismiss();

                });
        }
    }



}


