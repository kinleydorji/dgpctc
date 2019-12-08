import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController, LoadingController } from '@ionic/angular'; 
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conferenceselect',
  templateUrl: './conferenceselect.page.html',
  styleUrls: ['./conferenceselect.page.scss'],
})
export class ConferenceselectPage implements OnInit {
  private halls: any = [];
  constructor(private afs: AngularFirestore,private router: Router, private navCtrl: NavController, private storage: Storage, public loadingController: LoadingController) { }

  goToHall(hall: any)
  {
    this.storage.set('hall',hall);
    this.router.navigateByUrl('/conferencetabs/conferenceselect/42');
  }
 
  ngOnInit() {
    this.presentLoading();
    this.afs.collection('/Conference Hall',ref=>ref.orderBy('id', 'asc')).get().subscribe(res => { 
      res.forEach((doc:any) => {
        this.loadingController.dismiss();          
        console.log(doc.id); 
        this.halls.push(doc.id); 
      })
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
