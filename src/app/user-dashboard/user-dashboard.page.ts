import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage implements OnInit {
  
  constructor( private afAuth: AngularFireAuth, private alertCtrl: AlertController, private navCtrl: NavController) { 

  }

  logout()
  {
    this.afAuth.auth.signOut().then(() =>{
      this.navCtrl.navigateRoot('userlogin');
    })
    this.alert("Close Session", "You have Logged out Successfully");
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
            
          }
        }
      ]
    });
    await alert.present();
  }

  
  ngOnInit(){}


  

}
