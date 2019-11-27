import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { error } from '@angular/compiler/src/util';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  private newpasswd = "";
  private confirmpasswd = "";
  private userName = "";
  private organisation = "";

  inputStyleFN: string = 'inputStyle1';
  inputStyleOrg: string = 'inputStyle1';
  inputStylePN: string = 'inputStyle1';
  inputStyleNP: string = 'inputStyle1';
  inputStyleCP: string = 'inputStyle1';

  constructor(private alertCtrl: AlertController, private afAuth: AngularFireAuth,
     private toastCtrl: ToastController, private navCtrl: NavController, private afs: AngularFirestore) { 
  }

 
  passwordChange(){
    if(this.newpasswd == "" || this.confirmpasswd == "" || this.userName == "" || this.organisation == "" )
    {
      this.alert("Empty field(s)","Fill in all the field(s)");
    }
    else if(this.newpasswd != this.confirmpasswd){
      this.alert("Mismatch", "Password doesnot match");
    }
    else{
     
      this.afAuth.auth.currentUser.updatePassword(this.newpasswd).then(res =>{
        this.toastCtrl.create({
          message: 'Password changed successfully',
          duration: 2000
        }).then(toast =>{
          toast.present();
        })
        
        let userdetails = {
          username : this.userName,
          org : this.organisation,
          uuid : this.afAuth.auth.currentUser.uid,
          voteCasted : "no"
        }
        this.afs.collection("participants").doc(userdetails.uuid).set(userdetails);
        this.navCtrl.navigateRoot('userlogin');
      })
    }


    
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
            this.newpasswd = "";
            this.confirmpasswd = "";
          }
        }
      ]
    });
    await alert.present();
  }
  
  ngOnInit() {
  }

  inputFocusFN(){
    this.inputStyleFN = 'inputStyle2';
  }

  inputFocusOrg(){
    this.inputStyleOrg = 'inputStyle2';
  }
  inputFocusNP(){
    this.inputStyleNP = 'inputStyle2';
  }
  inputFocusPN(){
    this.inputStylePN = 'inputStyle2';
  }
  inputFocusCP(){
    this.inputStyleCP = 'inputStyle2';
  }
}
