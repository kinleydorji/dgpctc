import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-createpoll',
  templateUrl: './createpoll.page.html',
  styleUrls: ['./createpoll.page.scss'],
})
export class CreatepollPage implements OnInit {
  private presenter = "";
  private topic = "";
  private key = "";
  private votingLine:boolean = null;
 
  constructor(private alertCtrl: AlertController , private afs: AngularFirestore) {
    this.loadStatus();

   }

   
  createpoll(){
 
      if(this.presenter == "" || this.topic == "" || this.key == "")
      {
        this.alert("Empty Field(s)", "Fill in all empty field(s)");
      }
      else{
        let presenterDetails =  {
          presenterName : this.presenter,
          topic : this.topic,
          presenterId :this.key,
          voteCount : "0"
        }

        //checking if the presenter is already added or not
        this.afs.collection<any> ( 't_poll' , 
        ref => ref.where('presenterId','==',this.key))
           .snapshotChanges().subscribe(data =>{     
               if(data.length > 0)
               {
                 this.alert("Exists", "Presenter is already added");
               }
               else{
                this.afs.collection("t_poll").doc(presenterDetails.presenterId).set(presenterDetails);
                this.alert("Upload Successful", presenterDetails.presenterName + " is added to the poll");
               }
          }) 
         
      }
  }
  async alert(header:string,message:any) {
    const alert = await this.alertCtrl.create({
      header: header,
      cssClass:'alertError',
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


  votingStatus()
  {
    let voting = {
    votingStatus: this.votingLine
    }
    this.loadStatus();
    this.votingLine = !this.votingLine;
    this.afs.collection("t_overallStatus").doc("vote").update(voting);
  }

  loadStatus()
  {
    let results:any;
    this.afs.collection('t_overallStatus').valueChanges().subscribe(result => {
    results = result;
     this.votingLine = results[0].votingStatus;
     console.log("Firebase : " , results);
    })
  }

  ngOnInit() {
  }
   
    


}
