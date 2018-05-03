import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { HistoricoPage } from '../pages/historico/historico';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;

  rootPage:any = LoginPage;


  public paginas = [
    {titulo: 'Home', componente: HomePage, icone: "home" },
    // {titulo: 'Cadastro', componente: HistoricoPage, icone: "create"   },
    {titulo: 'Perfil', componente: HistoricoPage, icone: "person-add"  },
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  abrePagina(componente): void {
    this.nav.push(componente);

  }

}

