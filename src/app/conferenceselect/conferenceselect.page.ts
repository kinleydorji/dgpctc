import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular'; 
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-conferenceselect',
  templateUrl: './conferenceselect.page.html',
  styleUrls: ['./conferenceselect.page.scss'],
})
export class ConferenceselectPage implements OnInit {
  private halls: any = [];
  constructor(private afs: AngularFirestore, private navCtrl: NavController, private storage: Storage) { }

  goToHall(hall: any)
  {
    this.storage.set('hall',hall);
    this.navCtrl.navigateForward('/conferencetabs')
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
