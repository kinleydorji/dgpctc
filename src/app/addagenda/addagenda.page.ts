import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-addagenda',
  templateUrl: './addagenda.page.html',
  styleUrls: ['./addagenda.page.scss'],
})
export class AddagendaPage implements OnInit {
  private serial = "";
  private presenterName = "";
  private topic = "";
  private startTime = "";
  private endTime = "";
  private halls: any = [];
  constructor(private alertCtrl: AlertController, private afs: AngularFirestore) { }

  
  addAgenda()
  {
    if(this.serial  == "" || this.presenterName == "" || this.topic == "" || this.startTime == "" || this.endTime == "")
    {
      this.alert("Empty Field(s)", "Fill in all empty field(s)");
    }
    else{
      this.afs.collection("Conference Hall").doc().collection("agenda").doc().set({presenter : "karma", startTime: "10:00 AM"});
    }
  }


  getHall()
  {

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
  ngOnInit() {
      this.afs.firestore.collection('Conference Hall').get().then((querySnapshot) => { 
      querySnapshot.forEach((doc) => {
        console.log(doc.id); 
        this.halls = doc;   
   })
})
  }

}
