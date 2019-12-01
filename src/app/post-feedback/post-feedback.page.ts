import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-post-feedback',
  templateUrl: './post-feedback.page.html',
  styleUrls: ['./post-feedback.page.scss'],
})
export class PostFeedbackPage implements OnInit {

  private postFeedback ="";

  constructor(
    private fs : AngularFirestore,
    private altCtl : AlertController,
    private navCtl : NavController,) { }

  ngOnInit() {
  }
insertFeedback(){
    if(this.postFeedback  == "")
      {
        this.alert("Empty Field(s)", "Fill in all empty field(s)");
      }
      else
      {
        let basePath:string="/t_feedback";
        this.fs.collection(`${basePath}`).doc(`${this.postFeedback}`).set(
      {
      feedback : this.postFeedback,
      }
  ).then(data=>
    {
        console.log("Feedback data: "+data);
        this.alert("Successful","Your feedback has been successfully posted.");
        this.navCtl.navigateForward('/post-feedback');
        console.log(data);
    }
    )
  }
}

//for the alert
async alert(header:string,message:any) {
    const alert = await this.altCtl.create({
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
}

