import { UserProfilePage } from './../pages/user-profile/user-profile';
import { MessageService } from './../providers/message.service';
import { CapitalizePipes } from './../pipes/capitalize.pipe';
import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header';
import { AuthService } from './../providers/auth.service';
import { UserService } from './../providers/user.service';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { ChatPage } from './../pages/chat/chat';
import { HomePage } from '../pages/home/home';
import { SigninPage } from './../pages/signin/signin';
import { SignupPage } from './../pages/signup/signup';

import {AngularFireModule, FirebaseAppConfig, AuthProviders, AuthMethods} from 'angularfire2';
import { ChatService } from '../providers/chat.service';
import { MessageBoxComponent } from '../components/message-box/message-box';
import { UserInfoComponent } from '../components/user-info/user-info';
import { UserMenuComponent } from '../components/user-menu/user-menu';


const firebaseAppConfig : FirebaseAppConfig = {
    apiKey: "AIzaSyBK_wNs3pTuSO8nHi_nOAIwUXsYzsD09WI",
    authDomain: "ionic-2-firebasechat.firebaseapp.com",
    databaseURL: "https://ionic-2-firebasechat.firebaseio.com",
    storageBucket: "ionic-2-firebasechat.appspot.com",
    messagingSenderId: "752327321609"
  };

const firebaseAuthConfig = {
    provider : AuthProviders.Custom,
    method : AuthMethods.Password
}

@NgModule({
  declarations: [
    CapitalizePipes,
    CustomLoggedHeaderComponent,
    ChatPage,
    HomePage,
    MyApp,
    SigninPage,
    SignupPage,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent,
    UserProfilePage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig),
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatPage,
    HomePage,
    MyApp,
    SigninPage,
    SignupPage,
    UserProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ChatService,
    MessageService
  ]
})
export class AppModule {}
