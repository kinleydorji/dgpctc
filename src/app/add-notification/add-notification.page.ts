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
        message : this.postMessage
        // date : this.postDate
    }
    ).then(data=>
      {
        console.log("reach here with data: "+data);
          this.alert("For Information","Insertion successful");
          this.navCtl.navigateForward('/notification');
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
   
   // pickDate(){
   //   this.datePicker.show({
   //     date: new Date(),
   //     mode: 'date',
   //     //androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
   //     androidTheme : this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
   //   }).then(
   //     date =>{
   //       let dateArray=date.toString().split(' ');
   //       this.postDate=dateArray[0]+" "+dateArray[1]+" "+dateArray[2]+" "+dateArray[3]
   //       err => console.log('Error occurred while getting date: ', err)
   //     }
   //     //console.log('Got date: ', date),
   //   );
   // }
   
}
