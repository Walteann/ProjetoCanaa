import { IonicModule, NavController } from 'ionic-angular';
//Imports para o Angular
import { By, BrowserModule } from '@angular/platform-browser';
import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

//imports do Ionic

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//imports dos componentes

import { HomePage } from './home';
import { MyApp } from '../../app/app.component';

import {} from 'jasmine';

describe('Teste da Pagina Inicial ', () =>  {

    let HomeComponente: HomePage;
    let fixture: ComponentFixture<HomePage>;

    let debugEle: DebugElement;
    let titulo: HTMLElement;

    let ion_card: DebugElement;
    let ionCard: HTMLElement;

    beforeEach( () =>   {

        TestBed.configureTestingModule({

            declarations: [ HomePage, MyApp ],
            imports: [
                BrowserModule,
                IonicModule.forRoot(MyApp)
              ],
            providers: [ SplashScreen, StatusBar,NavController]

        });

        fixture = TestBed.createComponent(HomePage);

        HomeComponente = fixture.componentInstance;

        debugEle = fixture.debugElement.query(By.css('ion-title'));
        titulo = debugEle.nativeElement;



    });

    it('Deve Aparecer o titulo da Home, "Minha Feira" ', () =>  {
        expect(titulo.textContent).toBe('Minha Feira');
    });



});
