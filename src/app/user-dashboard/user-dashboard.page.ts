import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage implements OnInit {
<<<<<<< HEAD
  private userName: any;
<<<<<<< HEAD
  private confName;
  private venue;
  private time;
  private date;
  private banner;
  private url;
  constructor( private afAuth: AngularFireAuth, private alertCtrl: AlertController, private navCtrl: NavController, private afs: AngularFirestore) { 


=======
  
  constructor( private afAuth: AngularFireAuth, private alertCtrl: AlertController, private navCtrl: NavController) { 
>>>>>>> de6bd979ae0ae85ee953009fe33a3f49f81a4214

=======
  constructor( private afAuth: AngularFireAuth, private alertCtrl: AlertController, private navCtrl: NavController, private afs: AngularFirestore) { 
    
>>>>>>> parent of b5f9c81... adding conference added
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

<<<<<<< HEAD
<<<<<<< HEAD

  getConferenceInfo(){
    this.afs.collection<any>('conference',ref => ref.where('id','==','1'))
    .valueChanges().subscribe(data =>{     
        if(data.length > 0)
        {
          this.confName = data[0].confName,
          this.venue = data[0].venue,
          this.time = data[0].time,
          this.date = data[0].date,
          this.url = data[0].url,
          console.log("data: ", data);
        };
       })    
  }

=======
>>>>>>> de6bd979ae0ae85ee953009fe33a3f49f81a4214
  
  ngOnInit(){}
=======
  
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


  }
>>>>>>> parent of b5f9c81... adding conference added


  

}
