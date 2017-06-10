import { HomePage } from './../home/home';
import { AuthService } from './../../providers/auth.service';
import { SignupPage } from './../signup/signup';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  [x: string]: any;

  signinForm : FormGroup;

  constructor(
    public authService : AuthService,
    public loadingCtrl : LoadingController,
    public alertCtrl : AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder : FormBuilder) {

      let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      this.signinForm = this.formBuilder.group({
        email : ['', [Validators.compose([Validators.required, Validators.pattern(emailRegex)])]],
        password : ['', [Validators.required, Validators.minLength(6)]]
      })
  }

  onSubmit() : void {
    let loading : Loading = this.showLoading();

    this.authService.siginWithEmail(this.signinForm.value).then((isLogged : boolean) => {
      if(isLogged){
        this.navCtrl.setRoot(HomePage);
        loading.dismiss();
      }
    }).catch((error : any) => {
      console.log(error);
      loading.dismiss();
      this.showAlert(error);
    });
  }

  onSignUp() : void {
    this.navCtrl.push(SignupPage);
  }

  /*
  ionViewDidLoad() {
    if(this.authService.authenticated){
      console.log('Logado')
      this.navCtrl.setRoot(HomePage);
    } else {
      console.log('Não logado');
    }
  }
*/

  onHome(): void {
    this.navCtrl.push(HomePage)
      .then((hasAcess : boolean) => {
        console.log('Autorizado: ', hasAcess);
      }).catch((error) => {
        console.log('Não autorizado: ',error);
      });
  }

  onLogout(): void {
    this.authService.logout();
  }

  private showLoading() : Loading {
    let loading : Loading = this.loadingCtrl.create({
    content : 'Please wait...'});

    loading.present();
    return loading;
  }

  private showAlert(message : string) : void {
    this.alertCtrl.create({
      message : message,
      buttons : ['Ok']
    }).present(); 
  }
  
}
