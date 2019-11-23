import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Upload } from 'src/models/upload/upload';
import { UploadTask } from '@angular/fire/storage/interfaces';
import * as firebase from 'firebase';
import { UploadMo } from 'src/models/uploadmo/uploadmo';

@Component({
  selector: 'app-createpoll',
  templateUrl: './createpoll.page.html',
  styleUrls: ['./createpoll.page.scss'],
})
export class CreatepollPage implements OnInit {
  selectedFiles: FileList;
  currentUpload: Upload;
  private presenter = "";
  private topic = "";
  private key = "";
  private votingLine:boolean = null;
 
  uploadFs:UploadMo ={
    name:'',
    url:undefined,
    createdAt:''
  };

  constructor(private alertCtrl: AlertController , private afs: AngularFirestore) {
    this.loadStatus();

   }

   detectFiles(event:any)
   {
     this.selectedFiles = event.target.files;
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
        let file = this.selectedFiles.item(0)
        this.currentUpload = new Upload(file);
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
                this.pushUpload1(this.currentUpload);
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

  pushUpload1(upload: Upload) {
    //name of image
    let name:string=upload.file.name;
    let uploadTask: UploadTask = firebase.storage().ref('poll/'+name).put(upload.file);

    uploadTask.then((snapshot)=>
  {
    upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    upload.name=upload.file.name;
    
    firebase.storage().ref(`poll/`+name).getDownloadURL().then((url)=>{
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
    this.afs.collection("t_poll").doc(this.key).update(this.uploadFs);
  }

  ngOnInit() {
  }
   
    


}
