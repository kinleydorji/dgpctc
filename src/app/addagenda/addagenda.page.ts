import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

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
  private selectedHall = "";
  private agendaCount:any;
  constructor(private alertCtrl: AlertController, private afs: AngularFirestore) { }

  
  addAgenda()
  {
    if(this.serial  == "" || this.presenterName == "" || this.topic == "" || this.startTime == "" || this.endTime == "")
    {
      this.alert("Empty Field(s)", "Fill in all empty field(s)");
      console.log("selected Hall : ", this.selectedHall);
    }
    else{
      let presenterDetails = {
        presentername : this.presenterName,
        topic : this.topic,
        startTime : this.startTime,
        endTime : this.endTime,
      }
      let increment = firebase.firestore.FieldValue.increment(1);
      console.log("increment : ", increment)
      this.afs.collection("Conference Hall").doc(this.selectedHall).collection("agenda").doc("agendacount").update({agendacount : increment});
     
      this.afs.collection<any> ("Conference Hall").doc(this.selectedHall).collection("agenda").valueChanges().subscribe(data =>{
        console.log("result :", data[data.length - 1].agendacount);
       // this.agendaCount = this.agendaCount[0].agendacount;

   
      })
        this.afs.collection("Conference Hall").doc(this.selectedHall).collection("agenda")
      .doc("agenda_" + String(this.agendaCount)).set(presenterDetails);
      console.log("count :", this.agendaCount);  
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
        this.halls.push(doc.id);   
      })
    })
  }

}
