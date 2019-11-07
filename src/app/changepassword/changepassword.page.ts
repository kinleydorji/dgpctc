import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  private newpasswd = "";
  private confirmpasswd = "";
  constructor(private alertCtrl: AlertController, private afAuth: AngularFireAuth,
     private toastCtrl: ToastController, private navCtrl: NavController) { 


  }

 
  passwordChange(){
    if(this.newpasswd == "" || this.confirmpasswd == "")
    {
      this.alert("Empty field(s)","Fill in all the field(s)");
    }
    else if(this.newpasswd != this.confirmpasswd){
      this.alert("Mismatch", "Password doesnot match");
    }
    else{
      this.afAuth.auth.currentUser.updatePassword(this.newpasswd).then(res =>{
        this.toastCtrl.create({
          message: 'Password changed successfully',
          duration: 2000
        }).then(toast =>{
          toast.present();
        })

        this.navCtrl.navigateRoot('userlogin');

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
            this.newpasswd = "";
            this.confirmpasswd = "";
          }
        }
      ]
    });
    await alert.present();
  }
  ngOnInit() {
  }

}
