import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-passwordrecovery',
  templateUrl: './passwordrecovery.page.html',
  styleUrls: ['./passwordrecovery.page.scss'],
})
export class PasswordrecoveryPage implements OnInit {

  inputEmail = "";
  constructor(private modalCtrl: ModalController, private afAuth: AngularFireAuth, private toastCtrl: ToastController) { }


  dismiss(){
    this.modalCtrl.dismiss();
  }

  recover(){
    if(this.inputEmail == "")
    {
      this.presentToast("Empty field");
    }
    else{
      this.afAuth.auth.sendPasswordResetEmail(this.inputEmail).then(data =>{
      this.presentToast("Password reset Email sent");
      this.modalCtrl.dismiss();
     
      }, err => {
        this.presentToast(err.message);
      })
    }
  }
  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  
  
  ngOnInit() {
  }

}
