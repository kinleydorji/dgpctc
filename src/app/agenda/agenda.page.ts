import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { AngularFirestore } from '@angular/fire/firestore';
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
  constructor(private storage: Storage, private afs: AngularFirestore) {


   }

  ngOnInit() {

    this.storage.get('hall').then((hall) => {
       this.selectedHall = hall;
       console.log('Hall Stored : ' , this.selectedHall);
    });
    this.getConferenceDay();
    
  }


  getAgendaDoc()
  {
  

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
  }


  getAgendaDetails()
  {
    for(let i = 0; i < this.docId.length; i++)
    {
      this.afs.collection('Conference Hall').doc(this.selectedHall)
      .collection('agenda').doc('days')
      .collection(this.selectedDay).doc(this.docId[i]).valueChanges().subscribe(result => {
        console.log(result);
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
}
