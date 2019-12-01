import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, NavController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.page.html',
  styleUrls: ['./announcements.page.scss'],
})
export class AnnouncementsPage implements OnInit {

  postTitle : any;
  postData:any[]=[];
  postTime : any;
  timeoutStatus: any;
  constructor(private fs : AngularFirestore,
    private altCtl : AlertController,
    private navCtl : NavController,
    public loadingController: LoadingController
    ) { 
    
    this.presentLoading();

   
  }

  ngOnInit() {
 //for retriving the post data from the firestore
 this.fs.collection('/t_notification',ref=>ref.orderBy('poston', 'desc')).get().subscribe(res=>
  {
    res.forEach((doc:any)=>
    {
      this.postData.push({
        title : doc.data().title,
        message : doc.data().message,
        poston : doc.data().poston,
      })
      this.postTime = doc.data().poston;
      if(this.postData){
        console.log("data present");
        this.loadingController.dismiss();      
      }
    })
  })
  console.log(this.postData);
  this.timeoutStatus = setTimeout(() => {
    console.log("posted time value="+this.postTime);      
    if(this.postTime == undefined){
      console.log("No Internet Connection");
      this.loadingController.dismiss(); 
           
    }      
}, 5000);

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
