import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, NavController, LoadingController,} from '@ionic/angular';

@Component({
  selector: 'app-notification-update',
  templateUrl: './notification-update.page.html',
  styleUrls: ['./notification-update.page.scss'],
})
export class NotificationUpdatePage implements OnInit {
  postTitle : any;
  postMessage : any;
  postData:any[]=[];
  timeoutStatus: any;
title: string=this.route.snapshot.params['title'];
  constructor(
    public route: ActivatedRoute,
    private fs : AngularFirestore,
    private altCtl : AlertController,
    private navCtl : NavController,
    public loadingController: LoadingController,
  ) { 
    this.loadfromFirebase();
  }

  ngOnInit() {
  }

  loadfromFirebase(){
    this.fs.collection('/t_notification').doc(`${this.title}`).get().subscribe(res=>

     {
       this.postData.push({
         title:res.data().title,
         message:res.data().message,
       })
       this.postTitle = res.data().title;
       console.log("notification title : "+this.title);
       this.postMessage = res.data().message; 
     })
 }

 goUpdate(){
  let basePath:string="/t_notification";
  this.fs.collection(`${basePath}`).doc(`${this.postTitle}`).update(
    {
    title : this.postTitle,
    message : this.postMessage,
  }
  ).then(data=>
    {
      console.log("reach here with data: "+data);
        this.alert("For Information","update successful");
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
}
