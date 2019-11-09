import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { UploadTask } from '@angular/fire/storage/interfaces';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-overallconference',
  templateUrl: './overallconference.page.html',
  styleUrls: ['./overallconference.page.scss'],
})
export class OverallconferencePage implements OnInit {
private conferenceName = "";
private venue = "";
private time = "";
private date = "";
private imageName = "";
  constructor(private alertCtrl: AlertController, private afs : AngularFirestore , private fileChooser: FileChooser,
   private file : File) { }

   uploadFs={
    name:'',
    url:undefined,
    createdAt:''
  };

  addConference()
  {
    if(this.conferenceName == "" 
    || this.venue == "" 
    || this.time == "" 
    || this.date == "")
    {
      this.alert("Empty Field(s)", "Fill in all empty field(s)");
    }

    else{
      if(this.afs.collection('conference').doc('1')){
        this.afs.collection('conference').doc('1').delete();
      }

      let confDetails =  {
        confName : this.conferenceName,
        venue : this.venue,
        time : this.time,
        date : this.date,
        id : '1'
      }
      this.afs.collection("conference").doc(confDetails.id).set(confDetails);
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
          }
        }
      ]
    });
    await alert.present();
  }


  chooseFile()
  {
    this.fileChooser.open().then((uri)=>{
      this.alert("Image Url", uri);
      this.file.resolveLocalFilesystemUrl(uri).then((newUrl) =>{
        let dirPath = newUrl.nativeURL;
        let dirPathSegments = dirPath.split('/');   // split the string into array
        dirPathSegments.pop();   // remove the last elemnt, that is the file name
        dirPath = dirPathSegments.join('/');
        this.file.readAsArrayBuffer(dirPath, newUrl.name).then(async (buffer) =>{
          await this.upload(buffer, newUrl.name);
          this.imageName = newUrl.name;
          console.log(this.imageName);
        });
      })
    })
  }

  async upload(buffer, name){
    let blob = new Blob([buffer], {type: "image/png"});

    let storage = firebase.storage();
    let uploadTask: UploadTask = storage.ref('images/' + name).put(blob);
    // .then((result) =>{
    //   this.alert("Okay", "Success" );
    // }).catch((error) =>{
    //   this.alert("Upload Failure", "oops there was some error");
    // })
    uploadTask.then((snapshot)=>
  {  
    firebase.storage().ref(`images/`+name).getDownloadURL().then((url)=>{
      this.uploadFs.name=name;
      this.uploadFs.createdAt=new Date().toString();
      this.saveFileData(url,name);
    });

    
  })
}

saveFileData(url:any,name:any) {
  this.uploadFs.url=url;
  console.log('save data url='+url)
  console.log(this.uploadFs.name,this.uploadFs.url,this.uploadFs.createdAt);
  this.afs.collection(`1`).doc(`${this.conferenceName}`).update(this.uploadFs);
}
  
  ngOnInit() {
  }

}
