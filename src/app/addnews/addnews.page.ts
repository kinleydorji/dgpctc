import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UploadMo } from 'src/models/uploadmo/uploadmo';
import { Upload } from 'src/models/upload/upload';
import { UploadTask } from '@angular/fire/storage/interfaces';
import * as firebase from 'firebase';
import { stringify } from '@angular/compiler/src/util';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-addnews',
  templateUrl: './addnews.page.html',
  styleUrls: ['./addnews.page.scss'],
})
export class AddnewsPage implements OnInit {
  selectedFiles: FileList;
  currentUpload: Upload;
  newsCount: number = undefined;
  private serial = "";
  private title = "";
  private description = "";
  private halls: any = [];
  private hall = "";
  private postingDate: any;
  constructor(private alertCtrl: AlertController, private afs: AngularFirestore) { }

  uploadFs:UploadMo ={
    name:'',
    url:"none",
    createdAt:''
  };

  detectFiles(event:any)
  {
    this.selectedFiles = event.target.files;
  }
  
 async addNews()
  {
    if(this.title == "" || this.description == "")
    {
      this.alert("Empty Field(s)", "Fill in all empty field(s)");
    }
    else if(this.hall == "") {
      this.alert("Select Hall", "Hall not selected");

    }
    else
    {
 
      if(this.selectedFiles != undefined)
      {
        let file = this.selectedFiles.item(0)
        this.currentUpload = new Upload(file);
      }
      
      
        console.log("count="+this.newsCount);
        if(isNaN(this.newsCount))
        {
          console.log("hello");
          this.getCount();
        }
        this.postingDate = formatDate(new Date(), 'MMM-dd-yyyy H:mm:ss','en');
        if(this.newsCount < 1)
        {
          let increment = 1;
          this.afs.collection("News").doc(increment.toString()).set(
            {
              id : increment,
              title: this.title,
               description: this.description,
                hall: this.hall, 
                url: "none"
            }).then(data=>
            {
              if(this.selectedFiles != undefined)
              {
                this.pushUpload1(this.currentUpload);
              }
              this.afs.collection("News").doc("news"+this.newsCount).update({postingDate: this.postingDate});
              this.alert("Successful","Your post has been successfully posted.");    
            })
        }
        else
        {
          this.afs.collection("News").doc((this.newsCount + 1).toString()).set(
            {
              id : (this.newsCount + 1),
              title: this.title,
               description: this.description,
                hall: this.hall, 
                url: "none"
            }).then(data=>
            {
              if(this.selectedFiles != undefined)
              {
                this.pushUpload1(this.currentUpload);
              }
              this.afs.collection("News").doc("news"+this.newsCount).update({postingDate: this.postingDate});
              this.alert("Successful","Your post has been successfully posted.");    
            })
        }
    }
  }

  getCount()
  {
    this.afs.collection("News").valueChanges().subscribe(data =>{
        this.newsCount = data.length;
        console.log("News Count : ", this.newsCount);

      })
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
    this.afs.collection("News").doc((this.newsCount).toString()).update(this.uploadFs);
  }

  ngOnInit() {
    this.afs.firestore.collection('Conference Hall').get().then((querySnapshot) => { 
      querySnapshot.forEach((doc) => {
        console.log(doc.id); 
        this.halls.push(doc.id);   
      })
    })


 
 
  }


  ionViewWillEnter()
  {
   this.getCount();
  }
}
