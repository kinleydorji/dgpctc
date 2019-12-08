import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-addconferencehall',
  templateUrl: './addconferencehall.page.html',
  styleUrls: ['./addconferencehall.page.scss'],
})
export class AddconferencehallPage implements OnInit {
  private hallName = "";
  hallCount: number = undefined;
  constructor(private afs: AngularFirestore, private alertCtrl: AlertController, public loadingController: LoadingController) { }


  addhall()
  {

    if(this.hallName == "" || this.hallCount == undefined)
    {
      this.alert("Empty Field(s)", "Fill in all empty field(s)");
    }
    else{
      this.afs.collection("Conference Hall").doc(this.hallName).set({id:this.hallCount});
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 3000,
      spinner: 'crescent',
      cssClass: 'loaderClass'
    });
    return await loading.present();
  }

}
