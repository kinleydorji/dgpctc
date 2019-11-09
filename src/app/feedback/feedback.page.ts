import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, NavController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  postFeedback : any;
  fData:any[]=[];
  timeoutStatus: any;
  constructor(
    private fs : AngularFirestore,
    private altCtl : AlertController,
    private navCtl : NavController,
    public loadingController: LoadingController) {

    this.presentLoading();

    //for retriving the feedback data from the firestore
    this.fs.collection('/t_feedback').get().subscribe(res=>
      {
        res.forEach((doc:any)=>
        {
          this.fData.push({
            feedback : doc.data().feedback
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
}
