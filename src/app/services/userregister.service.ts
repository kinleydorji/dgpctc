import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserregisterService {

  constructor(private platform: Platform, private afAuth: AngularFireAuth) { 
 
  }

  
  // async getUser(email, pass) {

  //   if (this.platform.is('android')) {
  //     this.registerUser(email, pass);
  //   }

  //   if (this.platform.is('ios')) {
  //     this.registerUser(email, pass);
  //     await this.firebase.grantPermission();
  //   }
  
  // }

  // private registerUser(email, pass) {
  //   const devicesRef = this.afs.collection('participants');
  //   const data = {
  //     email,
  //     passwd: pass
  //   };

  //   return devicesRef.doc(email).set(data);
  // }
 

  // onNotifications() {
  //   return this.firebase.onNotificationOpen();
  // }



  registerUser(value){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.passwd)
      .then(
        res => resolve(res),
        err => reject(err))   
    })
   }

   loginUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.passwd)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }


  


}
