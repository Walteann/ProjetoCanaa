import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { AngularFireAuth } from 'angularfire2/auth';
import { EnderecoPage } from '../pages/endereco/endereco';
import { AngularFireDatabase } from 'angularfire2/database';
import { Usuario } from '../providers/endereco/usuario.model';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) public nav: Nav;

  rootPage: any;
  PATH: any;
  listagem: any;
  teste:any;
  load: any;
  userEmail: Usuario;
  public paginas = [
    { titulo: 'Home', componente: HomePage, icone: "home" },
    { titulo: 'Perfil', componente: EnderecoPage, icone: "person-add" },
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth, db: AngularFireDatabase,
  loadCtrl: LoadingController) {

    platform.ready().then(() => {
      // do whatever you need to do here.
      setTimeout(() => {
        splashScreen.hide();
      }, 100);
    });

    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        this.userEmail = {};
        this.PATH = '/usuarios/' + user.uid;
        this.rootPage = HomePage;
        this.teste = db;
        // this.load: LoadingController;
        this.userEmail.email = user.email;
        this.userEmail.displayName = user.displayName;
        this.userEmail.phoneNumber = user.phoneNumber;
        this.userEmail.photoURL = user.photoURL;
        this.userEmail.uid = user.uid;

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

  ngOnInit() {
    // this.load = this.load.create({
    //   spinner: 'crescent',
    // });
  }



  abrePagina(componente): void {
    
    // this.load.present();
    if (componente === HomePage) {
      this.nav.setRoot(componente);
      // this.load.dismiss();
    } else if (componente === EnderecoPage) {
      this.teste.list(this.PATH + '/enderecos').snapshotChanges()
        .map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        }).subscribe(data =>  {
          this.listagem = data[0];
          this.nav.setRoot(componente, { endereco: this.listagem, userLog: this.userEmail });
          console.log('entrei aqui');
          console.log(this.userEmail);
          // this.load.dismiss();
        });
    }

  }

}

