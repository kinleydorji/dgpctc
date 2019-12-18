import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage implements OnInit {
  public userName: any;
  public confName;
  public venue;
  public time;
  public startdate;
  public enddate;
  public description;
  public banner;
  public sponsor1;
  public sponsor2;
  public sponsor3;
  public sponsor4;
  public sponsor5;
  public sponsor6;

  public wholePageShowVar : boolean = false;

  constructor( public afAuth: AngularFireAuth, public alertCtrl: AlertController, 
    public navCtrl: NavController, public afs: AngularFirestore, public loadingController: LoadingController) { 
  }

  logout()
  {
    this.afAuth.auth.signOut().then(() =>{
      //this.navCtrl.navigateRoot('userlogin');
      this.alert("Close Session", "You have Logged out Successfully");
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
              this.navCtrl.navigateRoot('userlogin');
          }
        }
      ]
    });
    await alert.present();
  }

  getConferenceDetails()
  {
    this.presentLoading();
    this.afs.collection<any>('conference',ref => ref.where('id','==','1'))
    .valueChanges().subscribe(data =>{     
        if(data.length > 0)
        {
          this.confName = data[0].confName;
          this.venue = data[0].venue;
          this.startdate = data[0].startdate;
          
          let startDateArray = [];
          startDateArray = this.startdate.split('-')
          this.startdate = startDateArray[2]+'-'+startDateArray[1]+'-'+startDateArray[0];

          this.enddate = data[0].enddate;

          let endDateArray = [];
          endDateArray = this.enddate.split('-')
          this.enddate = endDateArray[2]+'-'+endDateArray[1]+'-'+endDateArray[0];

          this.description = data[0].description;
          this.time = data[0].time;
          this.banner = data[0].url;
          this.sponsor1 = data[0].url1;
          this.sponsor2 = data[0].url2;
          this.sponsor3 = data[0].url3;
          this.sponsor4 = data[0].url4;
          this.sponsor5 = data[0].url5;
          this.sponsor6 = data[0].url6;
        };
        this.wholePageShowVar = true;
        this.loadingController.dismiss();          
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

    this.getConferenceDetails();
  }

  goDetails(){
    this.navCtrl.navigateForward('conferenceselect');
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
