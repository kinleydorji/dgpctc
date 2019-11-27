import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, NavController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  
  postId : any;
  postTitle : any;
  postData:any[]=[];
  timeoutStatus: any;
  constructor(private fs : AngularFirestore,
    private altCtl : AlertController,
    private navCtl : NavController,
    public loadingController: LoadingController
    ) { 
    
    this.presentLoading();

    //for retriving the post data from the firestore
    this.fs.collection('/t_notification',ref=>ref.orderBy('id', 'desc')).get().subscribe(res=>
      {
        res.forEach((doc:any)=>
        {
          this.postData.push({
            id : doc.data().id,
            title : doc.data().title,
            message : doc.data().message,
            poston : doc.data().poston,
          })
          this.postId = doc.data().id;
          if(this.postData){
            console.log("data present");
            this.loadingController.dismiss();      
          }
        })
      })
      console.log(this.postData);
      this.timeoutStatus = setTimeout(() => {
        console.log("value="+this.postId);      
        if(this.postId == undefined){
          console.log("No Internet Connection");
          this.loadingController.dismiss();      
          this.navCtl.navigateForward('/internet-status');
        }      
    }, 5000);
  }

  ngOnInit() {}

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 15000,
      spinner: 'crescent',
      cssClass: 'loaderClass'
    });
    return await loading.present();
  }
}
