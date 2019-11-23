import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, NavController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.page.html',
  styleUrls: ['./add-notification.page.scss'],
})
export class AddNotificationPage implements OnInit {
  
  postId : any;
  postTitle : any;
  postMessage : any;
  postOn : any;
  // postDate : any;
  constructor(
    private fs : AngularFirestore,
    private altCtl : AlertController,
    private navCtl : NavController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }
  insertPost(){
    let basePath:string="/t_notification";
    this.fs.collection(`${basePath}`).doc(`${this.postId}`).set(
      {
        id : this.postId,
        title : this.postTitle,
        message : this.postMessage,
        poston : this. postOn
    }
    ).then(data=>
      {
        console.log("reach here with data: "+data);
          this.alert("For Information","Insertion successful");
          this.navCtl.navigateForward('conference-detail/notification');
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

   goUpdate(){
    this.navCtl.navigateForward('/admin-post-notification');
   }
}
