import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, NavController, LoadingController,} from '@ionic/angular';

@Component({
  selector: 'app-feedback-update',
  templateUrl: './feedback-update.page.html',
  styleUrls: ['./feedback-update.page.scss'],
})
export class FeedbackUpdatePage implements OnInit {

  postFeedback : any;
  fData:any[]=[];
  timeoutStatus: any;

  constructor(
    private fs : AngularFirestore,
    private altCtl : AlertController,
    private navCtl : NavController,
    public loadingController: LoadingController,
  ) { 

    this.presentLoading();
  //for retriving the feedback data from the firestore
this.fs.collection('/t_feedback').get().subscribe(res=>
  {
    res.forEach((doc:any)=>
    {
      this.fData.push({
        feedback : doc.data().feedback,
      })
      this.postFeedback = doc.data().feedback;
      if(this.fData){
        console.log("data present");
        this.loadingController.dismiss();      
      }
    })
  })
  console.log(this.fData);
  this.timeoutStatus = setTimeout(() => {
    console.log("value="+this.postFeedback);      
    if(this.postFeedback == undefined){
      console.log("No Internet Connection");
      this.loadingController.dismiss();      
      this.navCtl.navigateForward('/internet-status');
    }      
}, 5000);
 }

ngOnInit() {
}

async presentLoading() {
const loading = await this.loadingController.create({
  duration: 15000,
  spinner: 'crescent',
  cssClass: 'loaderClass'
});
return await loading.present();
}

//for deleting the notification item
goDelete(feedback:any){
this.presentAlertConfirm(feedback);
}

async presentAlertConfirm(feedback) {
const alert = await this.altCtl.create({
  header: 'Confirm!',
  message: 'Are you sure you want to delete?',
  buttons: [
    {
      text: 'No',
      role: 'cancel',
      cssClass: 'secondary',
      handler: (blah) => {
        console.log('No : Confirm Cancel');
      }
    }, {
      text: 'Yes',
      handler: () => {
        console.log('yes : Confirm Okay');
        this.deleteSure(feedback);
      }
    }
  ]
});

await alert.present();
}

deleteSure(feedback){
let basePath:string="/t_feedback";
this.fs.collection(`${basePath}`).doc(`${feedback}`).delete().then(data=>
  {
      this.alert("For Information","Deletion successful");
      this.navCtl.navigateForward('/feedback');
  }
  )
}

//for the alert
async alert(header : string, message : string)
{
  const alert = await this.altCtl.create({
    header : header,
    message : message,
    cssClass : 'ok',
    buttons : ['OK']
  });
  alert.present();
}
}
