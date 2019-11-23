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
  
  postId : any;
  postTitle : any;
  postMessage : any;
  postOn : any;
  postData:any[]=[];
  timeoutStatus: any;
id: string=this.route.snapshot.params['id'];
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
    this.fs.collection('/t_notification').doc(`${this.id}`).get().subscribe(res=>

     {
       this.postData.push({
         id :res.data().id,
         title:res.data().title,
         message:res.data().message,
         poston:res.data().poston,
       })
       this.postId = res.data().id;
       console.log("notification id : "+this.id);
       this.postTitle = res.data().title;
       console.log("title :"+this.postTitle);
       this.postMessage = res.data().message;
       console.log("message :"+this.postMessage);
       this.postOn = res.data().poston;
       console.log("message :"+this.postOn);
     })
 }

 goUpdate(){
  let basePath:string="/t_notification";
  this.fs.collection(`${basePath}`).doc(`${this.postId}`).update(
    {
    id : this.postId,
    title : this.postTitle,
    message : this.postMessage,
    poston : this.postOn,
  }
  ).then(data=>
    {
      console.log("reach here with data: "+data);
        this.alert("For Information","update successful");
        this.navCtl.navigateForward('announcements');
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

