import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Upload } from 'src/models/upload/upload';
import { AlertController, NavController } from '@ionic/angular';
import { UploadTask } from '@angular/fire/storage/interfaces';
import * as firebase from 'firebase';
import { UploadMo } from 'src/models/uploadmo/uploadmo';
import { UploadSp } from 'src/models/uploadsp/uploadsp';

@Component({
  selector: 'app-editconference',
  templateUrl: './editconference.page.html',
  styleUrls: ['./editconference.page.scss'],
})
export class EditconferencePage implements OnInit {

  private confName;
  private venue;
  private time;
  private date;
  private banner;
  private sponsorurl1 ="";
  private sponsorurl2 ="";
  private sponsorurl3 ="";
  private sponsorurl4 ="";
  private sponsorurl5 ="";
  private sponsorurl6 ="";
  urlbanner:string;
  sponsorsFiles: FileList[]=[];
  bannerFile: FileList;
  sponsorUpload: Upload[]=[];
  currentUpload: Upload;
  uploadFs:UploadMo ={
    name:'',
    url:undefined,
    createdAt:''
  };
  uploadSponsor: UploadSp ={
    url1:"none",
    url2:"none",
    url3:"none",
    url4:"none",
    url5:"none",
    url6:"none",
  }

  constructor(private afs: AngularFirestore, private alertCtrl: AlertController,
    private navCtrl: NavController) { }

  detectSFiles(event:any,i:any)
  {
    this.sponsorsFiles[i] = event.target.files;
  }

  detectBFiles(event:any)
  {
    this.bannerFile = event.target.files;

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

  getConferenceDetails()
  {
    this.afs.collection<any>('conference',ref => ref.where('id','==','1'))
    .valueChanges().subscribe(data =>{     
        if(data.length > 0)
        {
          this.confName = data[0].confName;
          this.venue = data[0].venue;
          this.date = data[0].date;
          this.time = data[0].time;
          this.banner = data[0].url;
        };
       })
  }

  saveChanges()
  {
    if(this.confName == "" 
    || this.venue == "" 
    || this.time == "" 
    || this.date == "")
    {
      this.alert("Empty Field(s)", "Fill in all empty field(s)");
    }
    else
    {
      if(this.bannerFile == undefined 
        && this.sponsorsFiles[0] == undefined
        && this.sponsorsFiles[1] == undefined
        && this.sponsorsFiles[2] == undefined
        && this.sponsorsFiles[3] == undefined
        && this.sponsorsFiles[4] == undefined
        && this.sponsorsFiles[5] == undefined)
      {
        let confDetails =  {
          confName : this.confName,
          venue : this.venue,
          time : this.time,
          date : this.date,
          id : '1'
        }
        this.afs.collection("conference").doc(confDetails.id).update(confDetails).
        then(data=>
        {
          this.alert("Info","Successfuly changed event details.");
          this.navCtrl.navigateForward('/home');
          console.log(data);
            
        })
      }
      else if(this.bannerFile != undefined
        && this.sponsorsFiles[0] == undefined
        && this.sponsorsFiles[1] == undefined
        && this.sponsorsFiles[2] == undefined
        && this.sponsorsFiles[3] == undefined
        && this.sponsorsFiles[4] == undefined
        && this.sponsorsFiles[5] == undefined)
      {
        let bfile = this.bannerFile.item(0);
        this.currentUpload = new Upload(bfile);
        let confDetails =  {
          confName : this.confName,
          venue : this.venue,
          time : this.time,
          date : this.date,
          id : '1'
        }
        this.afs.collection("conference").doc(confDetails.id).update(confDetails).
        then(data=>
          {
            this.pushUpload1(this.currentUpload);
            this.alert("Info","Successfuly changed event details.");
            this.navCtrl.navigateForward('/home');
              console.log(data);
              
          }
      
        );
      }
      else if(
        this.bannerFile  == undefined
        || this.sponsorsFiles[0] == undefined
        || this.sponsorsFiles[1] == undefined
        || this.sponsorsFiles[2] == undefined
        || this.sponsorsFiles[3] == undefined
        || this.sponsorsFiles[4] == undefined
        || this.sponsorsFiles[5] == undefined
      )
        {
          if(this.bannerFile != undefined)
          {
            let bfile = this.bannerFile.item(0);
            this.currentUpload = new Upload(bfile);
          }
          if(this.sponsorsFiles[0] != undefined)
          {
            let sfile1= this.sponsorsFiles[0].item(0);
            this.sponsorUpload[0] = new Upload(sfile1);
          }
          if(this.sponsorsFiles[1] != undefined)
          {
            let sfile2= this.sponsorsFiles[1].item(0);
            this.sponsorUpload[1] = new Upload(sfile2);
          }
          if(this.sponsorsFiles[2] != undefined)
          {
            let sfile3= this.sponsorsFiles[2].item(0);
            this.sponsorUpload[2] = new Upload(sfile3);
          }
          if(this.sponsorsFiles[3] != undefined)
          {
            let sfile4= this.sponsorsFiles[3].item(0);
            this.sponsorUpload[3] = new Upload(sfile4);
          }
          if(this.sponsorsFiles[4] != undefined)
          {
            let sfile5= this.sponsorsFiles[4].item(0);
            this.sponsorUpload[4] = new Upload(sfile5);
          }
          if(this.sponsorsFiles[5] != undefined)
          {
            let sfile6= this.sponsorsFiles[5].item(0);
            this.sponsorUpload[5] = new Upload(sfile6);
          }
          let confDetails =  {
            confName : this.confName,
            venue : this.venue,
            time : this.time,
            date : this.date,
            id : '1'
          }
          this.afs.collection("conference").doc(confDetails.id).update(confDetails).
          then(data=>
            {
              if(this.bannerFile != undefined)
              {
                this.pushUpload1(this.currentUpload);
              }
              this.pushUploadSponsors(
                this.sponsorUpload[0],
                this.sponsorUpload[1],
                this.sponsorUpload[2],
                this.sponsorUpload[3],
                this.sponsorUpload[4],
                this.sponsorUpload[5],
                );
              this.alert("Info","Successfuly changed event details.");
              this.navCtrl.navigateForward('/home');
              console.log(data);
                
            }
        
          );
        }
      }
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
        this.urlbanner=url;
        upload.url=url;
        this.uploadFs.name=name;
        this.uploadFs.createdAt=new Date().toString();
        this.saveFileData(url);
      });
    })
  }

  pushUploadSponsors(
    upload1: Upload,
    upload2: Upload,
    upload3: Upload,
    upload4: Upload,
    upload5: Upload,
    upload6: Upload,
    )
  {
    if(upload1 != undefined)
    {
      let name1:string=upload1.file.name;
      let uploadTask1: UploadTask = firebase.storage().ref('sponsors/'+name1).put(upload1.file);
      uploadTask1.then((snapshot)=>
      {
        upload1.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        upload1.name=upload1.file.name;
        firebase.storage().ref(`sponsors/`+name1).getDownloadURL().then((url)=>{
          upload1.url=url;
          this.uploadSponsor.url1=url;
        console.log('save data url='+url)
        console.log('url of sponsor'+this.uploadSponsor.url1);
        this.afs.collection("conference").doc('1').update(this.uploadSponsor);
  
        });
      })

    }

    if(upload2 != undefined)
    { 
      let name2:string=upload2.file.name;   
      let uploadTask2: UploadTask = firebase.storage().ref('sponsors/'+name2).put(upload2.file);
      uploadTask2.then((snapshot)=>
      {
        upload2.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        upload2.name=upload2.file.name;
        firebase.storage().ref(`sponsors/`+name2).getDownloadURL().then((url)=>{
          upload2.url=url;
          this.uploadSponsor.url2=url;
        console.log('save data url='+url)
        console.log(this.uploadSponsor.url2);
        this.afs.collection("conference").doc('1').update(this.uploadSponsor);

        });
      })
    }

    if(upload3 != undefined)
    {
      let name3:string=upload3.file.name;
      let uploadTask3: UploadTask = firebase.storage().ref('sponsors/'+name3).put(upload3.file);
      uploadTask3.then((snapshot)=>
      {
        upload3.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        upload3.name=upload3.file.name;
        firebase.storage().ref(`sponsors/`+name3).getDownloadURL().then((url)=>{
          upload3.url=url;
          this.uploadSponsor.url3=url;
        console.log('save data url='+url)
        console.log(this.uploadSponsor.url3);
        this.afs.collection("conference").doc('1').update(this.uploadSponsor);

        });
      })
    }

    if(upload4 != undefined)
    {
      let name4:string=upload4.file.name;   
      let uploadTask4: UploadTask = firebase.storage().ref('sponsors/'+name4).put(upload4.file);
      uploadTask4.then((snapshot)=>
      {
          upload4.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          upload4.name=upload4.file.name;
          firebase.storage().ref(`sponsors/`+name4).getDownloadURL().then((url)=>{
            upload4.url=url;
            this.uploadSponsor.url4=url;
          console.log('save data url='+url)
          console.log(this.uploadSponsor.url4);
          this.afs.collection("conference").doc('1').update(this.uploadSponsor);
  
        });
      })
    }

    if(upload5 != undefined)
    {
      let name5:string=upload5.file.name;   
      let uploadTask5: UploadTask = firebase.storage().ref('sponsors/'+name5).put(upload5.file);
      uploadTask5.then((snapshot)=>
      {
        upload5.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        upload5.name=upload5.file.name;
        firebase.storage().ref(`sponsors/`+name5).getDownloadURL().then((url)=>{
          upload1.url=url;
          this.uploadSponsor.url5=url;
        console.log('save data url='+url)
        console.log(this.uploadSponsor.url5);
        this.afs.collection("conference").doc('1').update(this.uploadSponsor);
  
        });
      })
    }

    if(upload6 != undefined)
    {
      let name6:string=upload6.file.name; 
      let uploadTask6: UploadTask = firebase.storage().ref('sponsors/'+name6).put(upload6.file);
      uploadTask6.then((snapshot)=>
      {
        upload6.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        upload6.name=upload6.file.name;
        firebase.storage().ref(`sponsors/`+name6).getDownloadURL().then((url)=>{
          upload6.url=url;
          this.uploadSponsor.url6=url;
        console.log('save data url='+url)
        console.log(this.uploadSponsor.url6);
        this.afs.collection("conference").doc('1').update(this.uploadSponsor);
  
        });
      })
    }   
  }

  saveFileData(url:any) {
    this.uploadFs.url=url;
    console.log('save data url='+url)
    console.log(this.uploadFs.name,this.uploadFs.url,this.uploadFs.createdAt);
    this.afs.collection("conference").doc('1').update(this.uploadFs);
  }

  ngOnInit() {
    this.getConferenceDetails();
  }

}
