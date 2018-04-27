import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule, RequestOptions } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { SettingPage } from './../pages/setting/setting';

import { CookieService } from 'angular2-cookie/core';
import { SettingService } from './common/setting.service';
import { UserService } from './services/user.service';
import { AuthService} from './services/authentication/auth.service';
import { AuthRequestOptions } from './services/authentication/auth-request.service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SettingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SettingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CookieService,
    SettingService,
    UserService,
    AuthService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: RequestOptions, useClass: AuthRequestOptions }
  ]
})
export class AppModule {}
