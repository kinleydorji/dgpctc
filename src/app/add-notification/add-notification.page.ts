import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, NavController, LoadingController} from '@ionic/angular';
import {formatDate} from '@angular/common';
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.page.html',
  styleUrls: ['./add-notification.page.scss'],
})
export class AddNotificationPage implements OnInit {
  
  private postId ="";
  private postTitle ="";
  private postMessage ="";
  postOn : any;
  dateTime: any;
  private docId =[];
  private announcementLength;
  constructor(
    private fs : AngularFirestore,
    private altCtl : AlertController,
    private navCtl : NavController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.getAnnouncementLength();

  }

  async insertPost(){
      if(this.postTitle == "" || this.postMessage == "")
      {
        this.alert("Empty Field(s)", "Fill in all empty field(s)");
      }
      else
      {
        this.dateTime = formatDate(new Date(), 'MMM-dd-yyyy H:mm:ss', 'en'); //get time and date
        let basePath:string="/t_notification";
        if(this.announcementLength < 1)
        {
          let increment = 1;
          this.fs.collection(`${basePath}`).doc(increment.toString()).set(
            {
              id : increment,
              title : this.postTitle,
              message : this.postMessage,
              poston : this. dateTime
            }).then(data=>
            {
              console.log("reach here with data: "+data);
                this.alert("Successful","Your post has been successfully posted.");
                this.navCtl.navigateForward('add-notification');
              console.log(data);
            })
        }
        else{
            this.fs.collection(`${basePath}`).doc((this.announcementLength + 1).toString()).set(
              {
                id : (this.announcementLength + 1),
                title : this.postTitle,
                message : this.postMessage,
                poston : this. dateTime
              }).then(data=>
              {
                console.log("reach here with data: "+data);
                  this.alert("Successful","Your post has been successfully posted.");
                  this.navCtl.navigateForward('add-notification');
                console.log(data);
              })  
            }
    
     
      }
    }

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

   goUpdate(){
    this.navCtl.navigateForward('/admin-post-notification');
   }
   goF(){
    this.navCtl.navigateForward('/post-feedback');
   }

   getAnnouncementLength()
   {
     this.fs.collection("t_notification").valueChanges().subscribe(data=>{
        this.announcementLength = data.length;
        console.log("announcement count : ", this.announcementLength);
    })
   }

 

}
