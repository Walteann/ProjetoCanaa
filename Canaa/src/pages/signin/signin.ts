import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth/user';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { AuthService } from '../../providers/auth/auth.service';
import { RecuperarUsuarioPage } from '../recuperar-usuario/recuperar-usuario';
import { EnderecoPage } from '../endereco/endereco';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@IonicPage()
@Component({
    selector: 'page-signin',
    templateUrl: 'signin.html',
})
export class SigninPage {
    user: User = new User();
    @ViewChild('form') form: NgForm
	listaUsuarios: AngularFireList<any>
    

    constructor(public navCtrl: NavController, public navParams: NavParams, private loadCtrl: LoadingController,
		private db: AngularFireDatabase,
        private authService: AuthService, private toastCtrl: ToastController, 
    ) {
		this.listaUsuarios = this.db.list('listaUsuarios');        
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SigninPage');
    }

    criarConta() {
        this.navCtrl.push(SignupPage);
    }

    resetPassword() {
        this.navCtrl.push(RecuperarUsuarioPage);
    }

    loginWithGoogle() {
        let load = this.loadCtrl.create({
            spinner: 'crescent',
        });
        load.present();
        this.authService.signInWithGoogle()
            .then(
                (data) => {
                    if (data.additionalUserInfo.isNewUser) {
                        this.navCtrl.setRoot(EnderecoPage);
                        this.listaUsuarios.push({
                            uid: data.user.uid,
                            email: data.user.email,
                            displayName: data.user.displayName,
                            phoneNumber: data.user.phoneNumber,
                            photoURL: data.user.photoURL
                        });
                    } else {
                        this.navCtrl.setRoot(HomePage);
                    }
                    load.dismiss();
                }).catch(
                    (error) => {
                        console.log(error.message);
                        load.dismiss();
                    }
                );
    }

    signIn() {
        if (this.form.form.valid) {

            let load = this.loadCtrl.create({
                spinner: 'crescent',
            });
            load.present();

            let data = this.form.form.value;

            if (!data.email) {
                return;
            }

            let credentials = {
                email: data.email,
                password: data.senha
            };

            this.authService.signInWithEmail(credentials)
                .then(() => {
                    this.navCtrl.setRoot(HomePage);
                    load.dismiss();
                }).catch((error: any) => {

                    let toast = this.toastCtrl.create({
                        duration: 3000, position: 'buttom'
                    });
                    if (error.code == 'auth/user-disabled') {
                        toast.setMessage('O usuario está desabilitado');
                    } else if (error.code == 'auth/invalid-email') {
                        toast.setMessage('O email digitado não é valido');
                    } else if (error.code == 'auth/user-not-found') {
                        toast.setMessage('Usuario não foi encontrado');
                    } else if (error.code == 'auth/wrong-password') {
                        toast.setMessage('A senha está incorreta');
                    }
                    toast.present();
                    load.dismiss();
                });
        }
    }

}
