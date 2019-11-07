import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserloginService {

  constructor(private afAuth: AngularFireAuth) { }


  loginUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.passwd)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }
}
