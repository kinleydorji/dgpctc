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
  private selectedHall;
  private startTime;
  private endTime;
  private docId:any = [];
  private selectedDay:any;
  private confDuration;
  private days:any = [];
  private resultsObj:any = [];
  constructor(private storage: Storage, private afs: AngularFirestore,public loadingController: LoadingController) {


   }

  ngOnInit() {
    this.presentLoading();
    this.storage.get('hall').then((hall) => {
       this.selectedHall = hall;
       this.loadingController.dismiss();          

       console.log('Hall Stored : ' , this.selectedHall);
    });
    this.getConferenceDay();
    
  }

  async emptyTheArray()
  {
    this.docId = [];
    this.resultsObj = [];
    console.log("length : ", this.docId.length);
  }

  getAgendaDoc()
  {
   this.emptyTheArray().then(()=>{
    console.log('triggered');
    this.afs.firestore.collection('Conference Hall')
    .doc(this.selectedHall).collection('agenda')
    .doc('days').collection(this.selectedDay).get().then((querySnapshot) => { 
      querySnapshot.forEach((doc) => {
        console.log("doc: ", doc.id)
        this.docId.push(doc.id);
        })
        this.getAgendaDetails();
      })
   })

  }


  getAgendaDetails()
  {
    this.presentLoading();

    for(let i = 0; i < this.docId.length; i++)
    {
      this.afs.collection('Conference Hall').doc(this.selectedHall)
      .collection('agenda').doc('days')
      .collection(this.selectedDay).doc(this.docId[i]).valueChanges().subscribe(result => {
        this.loadingController.dismiss();          
        this.resultsObj.push(result);
      })
    }
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
      duration: 3000,
      spinner: 'crescent',
      cssClass: 'loaderClass'
    });
    return await loading.present();
  }
}
