import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-castvote',
  templateUrl: './castvote.page.html',
  styleUrls: ['./castvote.page.scss'],
})
export class CastvotePage implements OnInit {

  private presenter;
  private topic;
  private image;
  private results:any;
  private voteCountData:any;
  private userVoteStatus;
  
  constructor(private afs: AngularFirestore, private afAuth : AngularFireAuth, private alertCtrl: AlertController,
     private toastCtrl: ToastController) { }

  

  getPresenter()
  {
    this.afs.collection('t_poll').valueChanges().subscribe(result => {
      this.results = result;
      console.log("details", this.results);
    })
  }
  ngOnInit() {
    this.getPresenter();
    this.afAuth.authState.subscribe(data =>{
      console.log("user data: ", data);
    });

    this.castedVoteORNot();

  }

  castVote(index:any){
      console.log(index);
      if(this.userVoteStatus[0].voteCasted == "no")
      {
        this.voteAlert("Are You Sure you want to vote for " + this.results[index].presenterName + "?", index);
      }
      else if(this.userVoteStatus[0].voteCasted == "yes")
      {
          this.alert("Vote Casted", "You have already casted the vote");
      }
     
    } 



  castedVoteORNot()
    {
      this.afs.collection<any> ( 'participants' , 
        ref => ref.where('uuid','==',this.afAuth.auth.currentUser.uid))
              .valueChanges().subscribe(data =>{     
                  if(data.length > 0)
                  {
                    this.userVoteStatus = data;
                    console.log("user vote : ", this.userVoteStatus[0].voteCasted);
                  }
            }) 
    }


    async voteAlert(header:string, index:any) {
      const alert = await this.alertCtrl.create({
        header: header,
        cssClass:'alert',
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              let db = firebase.firestore();
              let increment = firebase.firestore.FieldValue.increment(1);
              this.afs.collection("t_poll").doc(this.results[index].presenterId).update({voteCount : increment}).then(()=>{
                this.afs.collection("participants").doc(this.afAuth.auth.currentUser.uid).update({voteCasted: "yes"});
                this.presentToast("Your vote is counted. Thank You!")
              })
            }
          },
          {
            text: 'No',
            handler: () =>{

            }
          }
        ],  
      });
      await alert.present();
    }



    async alert(header:string,message:any) {
      const alert = await this.alertCtrl.create({
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

    async presentToast(msg) {
      const toast = await this.toastCtrl.create({
        message: msg,
        duration: 2000
      });
      toast.present();
    }
  }
