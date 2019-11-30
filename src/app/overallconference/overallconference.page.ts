import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UploadTask } from '@angular/fire/storage/interfaces';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import * as firebase from 'firebase';
import { Upload } from 'src/models/upload/upload';
import { UploadMo } from 'src/models/uploadmo/uploadmo';

@Component({
  selector: 'app-overallconferencce',
  templateUrl: './overallconference.page.html',
  styleUrls: ['./overallconference.page.scss'],
})
export class OverallconferencePage implements OnInit {
selectedFiles: FileList;
currentUpload: Upload;
private conferenceName = "";
private venue = "";
private startdate = "";
private enddate = "";
private duration = "";
private imageName = "";
url1:string;
  constructor(private alertCtrl: AlertController, private afs : AngularFirestore , 
    private fileChooser: FileChooser, private file : File,private navCtrl: NavController) { }

  uploadFs:UploadMo ={
    name:'',
    url:undefined,
    createdAt:''
  };

  detectFiles(event:any)
  {
    this.selectedFiles = event.target.files;
  }

  addConference()
  {
    if(this.conferenceName == "" 
    || this.venue == "" 
    || this.startdate == ""
    || this.enddate == ""
    || this.duration == "")
    {
      this.alert("Empty Field(s)", "Fill in all empty field(s)");
    }

    else{
      if(this.afs.collection('conference').doc('1')){
        this.afs.collection('conference').doc('1').delete();
      }
      let file = this.selectedFiles.item(0)
      this.currentUpload = new Upload(file);
      let confDetails =  {
        confName : this.conferenceName,
        venue : this.venue,
        startdate : this.startdate,
        enddate : this.enddate,
        duration : this.duration,
        id : '1',
        url1 : "none",
        url2 : "none",
        url3 : "none",
        url4 : "none",
        url5 : "none",
        url6 : "none",
      }
      this.afs.collection("conference").doc(confDetails.id).set(confDetails).
      then(data=>
        {
          this.pushUpload1(this.currentUpload);
          this.alert("Info","Successfuly added event.");
          this.navCtrl.navigateForward('/home');
            console.log(data);           
        }
    
      );
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

pushUpload1(upload: Upload) {
    //name of image
    let name:string=upload.file.name;
    let uploadTask: UploadTask = firebase.storage().ref('images/'+name).put(upload.file);

    uploadTask.then((snapshot)=>
  {
    upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    upload.name=upload.file.name;
    
    firebase.storage().ref(`images/`+name).getDownloadURL().then((url)=>{
      this.url1=url;
      upload.url=url;
      this.uploadFs.name=name;
      this.uploadFs.createdAt=new Date().toString();
      this.saveFileData(url);
    });
  })
  }


  // chooseFile()
  // {
  //   this.fileChooser.open().then((uri)=>{
  //     this.alert("Image Url", uri);
  //     this.file.resolveLocalFilesystemUrl(uri).then((newUrl) =>{
  //       let dirPath = newUrl.nativeURL;
  //       let dirPathSegments = dirPath.split('/');   // split the string into array
  //       dirPathSegments.pop();   // remove the last elemnt, that is the file name
  //       dirPath = dirPathSegments.join('/');
  //       this.file.readAsArrayBuffer(dirPath, newUrl.name).then(async (buffer) =>{
  //         await this.upload(buffer, newUrl.name);
  //         this.imageName = newUrl.name;
  //         console.log(this.imageName);
  //       });
  //     })
  //   })
  // }

//   async upload(buffer, name){
//     let blob = new Blob([buffer], {type: "image/png"});

//     let storage = firebase.storage();
//     let uploadTask: UploadTask = storage.ref('images/' + name).put(blob);
  
//     uploadTask.then((snapshot)=>
//   {  
//     firebase.storage().ref(`images/`+name).getDownloadURL().then((url)=>{
//       this.uploadFs.name=name;
//       this.uploadFs.createdAt=new Date().toString();
//       this.saveFileData(url,name);
//     });

    
//   })
// }

saveFileData(url:any) {
  this.uploadFs.url=url;
  console.log('save data url='+url)
  console.log(this.uploadFs.name,this.uploadFs.url,this.uploadFs.createdAt);
  this.afs.collection("conference").doc('1').update(this.uploadFs);
}
  
  ngOnInit() {
  }

}
