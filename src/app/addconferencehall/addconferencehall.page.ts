import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-addconferencehall',
  templateUrl: './addconferencehall.page.html',
  styleUrls: ['./addconferencehall.page.scss'],
})
export class AddconferencehallPage implements OnInit {
  private hallName = "";

  constructor(private afs: AngularFirestore, private alertCtrl: AlertController) { }


  addhall()
  {

    if(this.hallName == "")
    {
      this.alert("Empty Field(s)", "Fill in all empty field(s)");
    }
    else{
      this.afs.collection("Conference Hall").doc(this.hallName).set({});
      this.alert("Successful", "Conference hall added");

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
            this.hallName = "";
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
