import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, NavController, LoadingController,} from '@ionic/angular';

@Component({
  selector: 'app-admin-post-notification',
  templateUrl: './admin-post-notification.page.html',
  styleUrls: ['./admin-post-notification.page.scss'],
})
export class AdminPostNotificationPage implements OnInit {

  postId : any;
  postTitle : any;
  postData:any[]=[];
  timeoutStatus: any;

  constructor(
    private fs : AngularFirestore,
    private altCtl : AlertController,
    private navCtl : NavController,
    public loadingController: LoadingController,
    ) {
      this.presentLoading();
      //for retriving the post data from the firestore
    this.fs.collection('/t_notification',ref=>ref.orderBy('id', 'asc')).get().subscribe(res=>
      {
        res.forEach((doc:any)=>
        {
          this.postData.push({
            id : doc.data().id,
            title : doc.data().title,
            message : doc.data().message
            //date : doc.data().date,
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

  //for adding notification
  goAddmore(){
    this.navCtl.navigateForward('/add-notification');
  }

  //for deleting the notification item
  goDelete(id:any){
    this.presentAlertConfirm(id);
  }
 
  async presentAlertConfirm(id) {
    const alert = await this.altCtl.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('No : Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('yes : Confirm Okay');
            this.deleteSure(id);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteSure(id){
    let basePath:string="/t_notification";
    this.fs.collection(`${basePath}`).doc(`${id}`).delete().then(data=>
      {
          this.alert("For Information","Deletion successful");
          this.navCtl.navigateForward('/notification');
      }
      )
  }

  //for editing or updating the notiding item
  goEdit(id : any){
    console.log(id);
    this.navCtl.navigateForward('/notification-update/'+id);
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
