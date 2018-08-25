import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
//import { HttpModule } from '@angular/http';
import { BrMaskerModule } from 'brmasker-ionic-3';

import { AmbienteComprasPage } from '../pages/ambiente-compras/ambiente-compras';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { GasPage } from '../pages/gas/gas';
import { SignupPage } from '../pages/signup/signup';
import { EnderecoPage } from '../pages/endereco/endereco';
import { RecuperarUsuarioPage } from '../pages/recuperar-usuario/recuperar-usuario';


import { GasService } from '../pages/gas/gas.service';
import { UsuarioServiceProvider } from '../providers/usuario-service/usuario-service';
import { AuthService } from '../providers/auth/auth.service';
import { SigninPage } from '../pages/signin/signin';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        SigninPage,
        AmbienteComprasPage,
        GasPage,
        EnderecoPage,
        SignupPage,
        RecuperarUsuarioPage
    ],
    imports: [
        BrowserModule,
        BrMaskerModule,
        IonicModule.forRoot(MyApp),
        FormsModule,
        AngularFireModule.initializeApp(
            {
                apiKey: '##COLAR AQUI FIREBASE',
                authDomain: '##COLAR AQUI FIREBASE',
                databaseURL: '##COLAR AQUI FIREBASE',
                projectId: '##COLAR AQUI FIREBASE',
                storageBucket: '##COLAR AQUI FIREBASE',
                messagingSenderId: '##COLAR AQUI FIREBASE'
            }
        ),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        HttpClientModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        SigninPage,
        AmbienteComprasPage,
        GasPage,
        EnderecoPage,
        RecuperarUsuarioPage,
        SignupPage

    ],
    providers: [
        StatusBar,
        SplashScreen,
        GasService,
        AuthService,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        UsuarioServiceProvider,
    ]
})
export class AppModule { }
