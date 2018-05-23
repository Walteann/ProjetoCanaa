import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { AngularFireAuth } from 'angularfire2/auth';
import { EnderecoPage } from '../pages/endereco/endereco';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;

  rootPage: any;
  PATH: any;
  listagem: any;
  teste:any;
  load: any;

  public paginas = [
    { titulo: 'Home', componente: HomePage, icone: "home" },
    { titulo: 'Perfil', componente: EnderecoPage, icone: "person-add" },
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth, db: AngularFireDatabase,
  loadCtrl: LoadingController) {

    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        this.PATH = '/usuarios/' + user.uid;
        this.rootPage = HomePage;
        this.teste = db;
        this.load = loadCtrl;

        authObserver.unsubscribe();
      } else {
        this.rootPage = SigninPage;
        authObserver.unsubscribe();
      }
    })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  abrePagina(componente): void {
    let load = this.load.create({
      spinner: 'crescent',
    });
    load.present();
    if (componente === HomePage) {
      this.nav.setRoot(componente);
      load.dismiss();
    } else if (componente === EnderecoPage) {
      this.teste.list(this.PATH).snapshotChanges()
        .map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        }).subscribe(data =>  {
          this.listagem = data[0];
          this.nav.setRoot(componente, { endereco: this.listagem });
          console.log('entrei aqui');
          load.dismiss();
        });
    }

  }

}

