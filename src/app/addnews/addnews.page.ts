import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UploadMo } from 'src/models/uploadmo/uploadmo';
import { Upload } from 'src/models/upload/upload';
import { UploadTask } from '@angular/fire/storage/interfaces';
import * as firebase from 'firebase';
import { stringify } from '@angular/compiler/src/util';


@Component({
  selector: 'app-addnews',
  templateUrl: './addnews.page.html',
  styleUrls: ['./addnews.page.scss'],
})
export class AddnewsPage implements OnInit {
  selectedFiles: FileList;
  currentUpload: Upload;
  newsCount = "";
  private serial = "";
  private presenterName = "";
  private title = "";
  private time = "";
  private description = "";
  private halls: any = [];
  private hall;
  constructor(private alertCtrl: AlertController, private afs: AngularFirestore) { }

  uploadFs:UploadMo ={
    name:'',
    url:undefined,
    createdAt:''
  };
  
  addNews()
  {
    this.hall = stringify(this.hall);
    console.log("hall="+this.hall);
    this.afs.collection("Conference Hall").doc(this.hall).collection("news").doc("newscount").get().subscribe(data=>
      {
        this.newsCount = data[0].newscount;
      })

    console.log("news count"+this.newsCount);
    // if(this.serial  == "" || this.presenterName == "" || this.title == "" || this.time == "" || this.description == "")
    // {
    //   this.alert("Empty Field(s)", "Fill in all empty field(s)");
    // }
    // else{
    
    //   this.afs.collection("Conference Hall").doc(this.hall).collection("news").doc("news"+this.newsCount).set({presenter : this.presenterName, time: this.time, title: this.title, description: this.description});
    // }
  }


  getHall()
  {
    
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

  pushUpload1(upload: Upload) {
    //name of image
    let name:string=upload.file.name;
    let uploadTask: UploadTask = firebase.storage().ref('newsfeed/'+name).put(upload.file);

    uploadTask.then((snapshot)=>
  {
    upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    upload.name=upload.file.name;
    
    firebase.storage().ref(`newsfeed/`+name).getDownloadURL().then((url)=>{
      upload.url=url;
      this.uploadFs.name=name;
      this.uploadFs.createdAt=new Date().toString();
      this.saveFileData(url);
    });
  })
  }

  saveFileData(url:any) {
    this.uploadFs.url=url;
    console.log('save data url='+url)
    console.log(this.uploadFs.name,this.uploadFs.url,this.uploadFs.createdAt);
    this.afs.collection("conference").doc('1').update(this.uploadFs);
  }

  ngOnInit() {
    this.afs.firestore.collection('Conference Hall').get().then((querySnapshot) => { 
      querySnapshot.forEach((doc) => {
        console.log(doc.id); 
        this.halls.push(doc.id);   
      })
    })
  }
}
