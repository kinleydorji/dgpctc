import { Component, OnInit } from '@angular/core';
import { UserloginService } from '../services/userlogin/userlogin.service';
import { AlertController, NavController, ModalController,LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { PasswordrecoveryPage } from '../modal/passwordrecovery/passwordrecovery.page';
import { Storage} from '@ionic/storage';
@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.page.html',
  styleUrls: ['./userlogin.page.scss'],
})
export class UserloginPage implements OnInit {

  errorMessage: string;
  inputEmail:any = "";
  password:any = "";

  inputStyleUN: string = 'inputStyle1';
  inputStylePW: string = 'inputStyle1';

  constructor(private userLogin: UserloginService, private alertCtrl: AlertController, 
    private navCtrl: NavController, private afAuth: AngularFireAuth, private modalController: ModalController,
    public loadingController: LoadingController, private storage: Storage) { 

  }
  login(){
    let value = {
      email: this.inputEmail,
      passwd : this.password
    }
    if(this.inputEmail == "" || this.password == "")
    {
        this.alertError("Empty Field(s)", "Fill in all the field(s)");
    }
    else{
      this.presentLoading();
      this.userLogin.loginUser(value)
      .then(res => {
        console.log(res);
        console.log('login success');
        if(this.password == "dgpc123"){
          this.loadingController.dismiss();          
          this.navCtrl.navigateRoot('changepassword');      
        }
        else{
          this.storage.set("email",this.inputEmail);
          this.storage.set("password",this.password);  
          this.navCtrl.navigateRoot('conferencetabs');  
          this.loadingController.dismiss();  
          console.log("password:",this.afAuth.auth.currentUser.uid);    
        }
      }, err => {
        this.errorMessage = err.message;
        this.alertError("Doesnot exist","There is no user record corresponding to this identifier")
       
      })
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 3000,
      spinner: 'crescent',
      cssClass: 'loaderClass'
    });
    return await loading.present();
  }

  inputFocusUN(){
    this.inputStyleUN = 'inputStyle2';
  }

  inputFocusPW(){
    this.inputStylePW = 'inputStyle2';
  }

  async alert(header:string,message:any) {
    const alert = await this.alertCtrl.create({
      header: header,
      cssClass:'alert',
      message: message,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.inputEmail = "";
            this.password = "";
          }
        }
      ]
    });
    await alert.present();
  }

  async alertError(header:string,message:any) {
    const alert = await this.alertCtrl.create({
      header: header,
      cssClass:'alertError',
      message: message,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.inputEmail = "";
            this.password = "";
          }
        }
      ]
    });
    await alert.present();
  }

  async recoverPassword() {
    const modal = await this.modalController.create({
      component: PasswordrecoveryPage,
      cssClass: 'recoverPasswordModalCss'
    });
    return await modal.present();
  }

  ngOnInit() {
    this.storage.get('email').then((email) => {
      this.inputEmail = email;
      console.log(this.inputEmail)
    });
    this.storage.get('password').then((passwd) => {
      this.password = passwd;
      console.log(this.password);
   });
  

  }

}
