import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-post-feedback',
  templateUrl: './post-feedback.page.html',
  styleUrls: ['./post-feedback.page.scss'],
})
export class PostFeedbackPage implements OnInit {

  postFeedback : any;

  constructor(
    private fs : AngularFirestore,
    private altCtl : AlertController,
    private navCtl : NavController,) { }

  ngOnInit() {
  }
insertFeedback(){
  let basePath:string="/t_feedback";
    this.fs.collection(`${basePath}`).doc(`${this.postFeedback}`).set(
    {
      feedback : this.postFeedback,
  }
  ).then(data=>
    {
      console.log("Feedback data: "+data);
        this.alert("For Information","feedback successful");
        this.navCtl.navigateForward('/feedback');
      console.log(data);
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
