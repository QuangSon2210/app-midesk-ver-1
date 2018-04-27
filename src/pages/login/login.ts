import { Component  } from '@angular/core';
import { AlertController, MenuController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from './../../app/services/authentication/auth.service';
import { UserService } from './../../app/services/user.service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserService]
})
export class LoginPage {
	private loginForm : FormGroup;
 	invalidCredentialMsg: string = "";
  submitLoading: boolean = false;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public loadingCtrl: LoadingController,
  	private _authService: AuthService,
    private _userService: UserService,
    private alertCtrl: AlertController,
    private menuCtrl: MenuController,
  ){

  }
  ionViewWillLoad(){
    this.menuCtrl.swipeEnable(false);
    this.loginForm = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });
  }
  onFormSubmit(){
     let email = this.loginForm.get('email').value;
     let password = this.loginForm.get('password').value;
     this.submitLoading = true;
  	  this._userService.checkUserLogin(email, password).subscribe(
            res => {
                this.submitLoading = false;
                if (this._authService.setUserAuthenticated(res)) {
                    this.presentLoading();
                    setTimeout(function(){
                      window.location.reload();
                    },3000);
                } else {
                    if(typeof res.error != 'undefined'){
                        this.invalidCredentialMsg = res.error.errors.info;
                        this.showAlert(this.invalidCredentialMsg);
                    }else{
                        this.invalidCredentialMsg = 'Đăng nhập không thành công, vui lòng kiểm tra lại!';
                        this.showAlert(this.invalidCredentialMsg);
                    }
                }
            },
            err => {
                this.submitLoading = false;
                this.invalidCredentialMsg = 'Đăng nhập không thành công, vui lòng kiểm tra lại!';
                this.showAlert(this.invalidCredentialMsg);
            }
        )
  }
  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Có lỗi xảy ra!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Vui lòng chờ...",
    });
    loader.present();
  }
}
