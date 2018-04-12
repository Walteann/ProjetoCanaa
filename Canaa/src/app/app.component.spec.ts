// import { IonicModule } from 'ionic-angular';
// import { SplashScreen } from '@ionic-native/splash-screen';
// import { StatusBar } from '@ionic-native/status-bar';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { By, BrowserModule } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { MyApp } from './app.component';
// import {} from 'jasmine';



// describe('Teste do MENU "HAMBUGUER" ', () =>    {

//     let myAppComponente: MyApp;
//     let fixture: ComponentFixture<MyApp>;
//     let id_elemento: DebugElement;
//     let elementoHTML: HTMLElement;

//     beforeEach( () =>   {

//         TestBed.configureTestingModule({

//             declarations:[ MyApp ],
//             imports: [
//                 BrowserModule,
//                 IonicModule.forRoot(MyApp)
//               ],
//             providers:[ SplashScreen, StatusBar]

//         });

//         fixture = TestBed.createComponent(MyApp);

//         myAppComponente = fixture.componentInstance;

//         id_elemento = fixture.debugElement.query(By.css('ion-title'));

//         elementoHTML = id_elemento.nativeElement;

//     });

//     it('Deve verificar se o Titulo é MENU', () =>   {
//         expect(elementoHTML.textContent).toContain('Menu');
//     });

//     it('Deve verificar se a SideBar MENU tem 2 rotas', () =>    {
//         expect(myAppComponente.paginas.length).toBe(2);
//     });


// });
