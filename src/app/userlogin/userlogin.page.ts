import { Component, OnInit } from '@angular/core';
import { UserloginService } from '../services/userlogin/userlogin.service';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { PasswordrecoveryPage } from '../modal/passwordrecovery/passwordrecovery.page';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.page.html',
  styleUrls: ['./userlogin.page.scss'],
})
export class UserloginPage implements OnInit {

  errorMessage: string;
  inputEmail = "";
  password = "";
  constructor(private userLogin: UserloginService, private alertCtrl: AlertController, 
    private navCtrl: NavController, private afAuth: AngularFireAuth, private modalController: ModalController) { 

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

      this.userLogin.loginUser(value)
      .then(res => {
        console.log(res);
        console.log('login success');
        if(this.password == "cfc@2019"){
          this.navCtrl.navigateRoot('changepassword');      
        }
        else{
          this.navCtrl.navigateRoot('user-dashboard');  
          console.log("password:",this.afAuth.auth.currentUser.uid);    
        }
      }, err => {
        this.errorMessage = err.message;
        this.alertError("Doesnot exist","There is no user record corresponding to this identifier")
       
      })
    }
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
  }

}
