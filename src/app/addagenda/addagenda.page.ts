import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Upload } from 'src/models/upload/upload';
import * as firebase from 'firebase';

@Component({
  selector: 'app-addagenda',
  templateUrl: './addagenda.page.html',
  styleUrls: ['./addagenda.page.scss'],
})
export class AddagendaPage implements OnInit {
  selectedFiles: FileList;
  currentUpload: Upload;
  private presenterName = "";
  private topic = "";
  private startTime = "";
  private endTime = "";
  private halls: any = [];
  private selectedHall = "";
  private agendaCount:any;
  private selectedDay = "";
  private confDuration;
  private days:any = [];
  private serial:number;
  constructor(private alertCtrl: AlertController, private afs: AngularFirestore, private loadingController: LoadingController) { }

  
  async addAgenda()
  {
    if(this.topic == "" || this.startTime == "" || this.endTime == "")
    {
      this.alert("Empty Field(s)", "Fill in all empty field(s)");
      console.log("selected Hall : ", this.selectedHall);
    }
    else{
    
      console.log("count="+this.agendaCount);
      this.presentLoading();
      this.getAgendaCount();
      this.agendaCount += 1;
      this.serial = Number(this.agendaCount);
      let presenterDetails = {
        presentername : this.presenterName,
        topic : this.topic,
        startTime : this.startTime,
        endTime : this.endTime,
        serial : this.serial
      }
      this.afs.collection("Conference Hall").doc(this.selectedHall).collection("agenda").doc("agendacount").set({agendacount: this.agendaCount});
      this.afs
      .collection("Conference Hall").doc(this.selectedHall)
      .collection("agenda").doc("days")
      .collection(this.selectedDay).doc(this.agendaCount.toString()).set(presenterDetails).then(()=>{
        this.alert("Successful", "Agenda Added");
        this.loadingController.dismiss();
      });
    }
  }


  getAgendaCount()
  {
    this.afs.collection ("Conference Hall").doc(this.selectedHall).collection("agenda").valueChanges().subscribe( data =>{
      this.agendaCount = data[data.length - 1].agendacount;
      console.log("getcount="+this.agendaCount);   
      })    
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



  getConferenceDay()
  {

    this.afs.collection<any>('conference',ref => ref.where('id','==','1'))
    .valueChanges().subscribe(data =>{     
        if(data.length > 0)
        {
          this.confDuration = data[0].duration;
          console.log("Duration : ", this.confDuration);
          for(let i = 0; i < this.confDuration; i++)
          {
            this.days.push("Day " + (i+1));
          }
        };
       })
  }


  ngOnInit() {
      this.afs.firestore.collection('Conference Hall').get().then((querySnapshot) => { 
      querySnapshot.forEach((doc) => {
        console.log(doc.id); 
        this.halls.push(doc.id);   
      })
    })
    this.getConferenceDay();
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      cssClass: 'loaderClass'
    });
    return await loading.present();
  }
}
