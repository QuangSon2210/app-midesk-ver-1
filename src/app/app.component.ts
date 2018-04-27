import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { SettingPage } from './../pages/setting/setting';

import { AuthService } from './services/authentication/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  loggedInUser = {};

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private _authService: AuthService,
    private alertCtrl: AlertController
    ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      // { title: 'Notifications', component: NotificationsPage, icon:'notifications-outline'},
      // { title: 'Add Ticket', component: TicketAddPage, icon:'create'},
      // { title: 'Customer', component: CustomerPage, icon:'people'},
      { title: 'Settings', component: SettingPage, icon:'settings'},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      /*if(this._authService.isUserLoggedIn()){
        this.loggedInUser = this._authService.getLoggedInUser();
        this.rootPage = HomePage;
      }else{
        this.loggedInUser = {};
        this.rootPage = LoginPage;
      } */
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }
  openPage(page) {
    this.nav.push(page.component);
  }
  logOut(){
    this.confirmLogout();
  }
  confirmLogout(){
    let prompt = this.alertCtrl.create({
      title: 'Thông báo!',
      message: "Bạn có chắc là muốn đăng xuất?",
      buttons: [
        {
          text: 'Hủy',
          handler: data => {
          }
        },
        {
          text: 'Đồng ý',
          handler: data => {
            this._authService.logoutUser();
            // this.nav.setRoot(LoginPage);
            // this.rootPage = LoginPage;
            window.location.reload();
          }
        }
      ]
    });
    prompt.present();
  }
}
