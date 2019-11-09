import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage implements OnInit {
  private userName: any;
  private confName;
  private venue;
  private time;
  private date;
  private banner;
  constructor( private afAuth: AngularFireAuth, private alertCtrl: AlertController, private navCtrl: NavController, private afs: AngularFirestore) { 



  }

  logout()
  {
    this.afAuth.auth.signOut().then(() =>{
      this.navCtrl.navigateRoot('userlogin');
    })
    this.alert("Close Session", "You have Logged out Successfully");
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


  getConferenceInfo(){
    this.afs.collection<any>('conference',ref => ref.where('id','==','1'))
    .valueChanges().subscribe(data =>{     
        if(data.length > 0)
        {
          this.confName = data[0].confName,
          this.venue = data[0].venue,
          this.time = data[0].time,
          this.date = data[0].date
          console.log("data: ", data);
        };
       })    
  }

  
  ngOnInit(){
    console.log("inside:" + this.afAuth.auth.currentUser.uid);
    this.afs.collection<any>('participants',ref => ref.where('uuid','==',this.afAuth.auth.currentUser.uid))
           .valueChanges().subscribe(data =>{     
               if(data.length > 0)
               {
                let uName:String[] = data[0].username.split(" ");
                this.userName = uName[0];
                console.log(data[0].username);
               };
              })

    this.getConferenceInfo();
  }


  

}
