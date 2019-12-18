import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {
  public selectedHall;
  public startTime;
  public endTime;
  public agendaData:any = [];
  public selectedDay:any;
  public confDuration;
  public days:any = [];
  constructor(public storage: Storage, public afs: AngularFirestore,public loadingController: LoadingController) {


   }

  ngOnInit() {
    
    
  }

  ionViewDidEnter(){
    this.presentLoading();
    this.storage.get('hall').then((hall) => {
       this.selectedHall = hall;
       this.loadingController.dismiss();          

       console.log('Hall Stored : ' , this.selectedHall);
    });
    this.getConferenceDay();
  }

  getAgendaDoc()
  {
    this.presentLoading();
    this.agendaData = [];
    console.log('triggered');
    this.afs.collection('Conference Hall').doc(this.selectedHall)
    .collection('agenda').doc('days')
    .collection(this.selectedDay,ref=>ref.orderBy('serial', 'asc')).get().subscribe((res) => { 
      res.forEach((doc) => {
        this.agendaData.push(
          {
            presentername : doc.data().presentername,
            endTime : doc.data().endTime,
            startTime : doc.data().startTime,
            topic: doc.data().topic
          })
        })
      })

      console.log("Agenda : ", this.agendaData);
      this.loadingController.dismiss();
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 1500,
      spinner: 'crescent',
      cssClass: 'loaderClass'
    });
    return await loading.present();
  }


 
}
