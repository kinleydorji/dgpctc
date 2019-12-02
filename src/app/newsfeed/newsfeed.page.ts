import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { NewsFeedModel } from 'src/models/newsfeed/newsfeed'
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.page.html',
  styleUrls: ['./newsfeed.page.scss'],
})
export class NewsfeedPage implements OnInit {
  private selectedHall;
  private docId:any = [];
  result: NewsFeedModel[] = [];
  private resultLength = 0;
  private docIdLength;
  constructor(private storage: Storage, private afs: AngularFirestore, public loadingController: LoadingController) {


   }

  ngOnInit() {
 
   
  }
  ionViewWillEnter()
  {
    this.presentLoading();
    this.storage.get('hall').then((hall) => {
      this.selectedHall = hall;
      console.log("loading dismissed");
      console.log('Hall Stored : ' , this.selectedHall);
      this.getNewsDoc(this.selectedHall);
   });
  }

  getNewsDoc(selectedHall: any)
  {
    this.docId = [];
    console.log('triggered'+selectedHall);
    this.afs.firestore.collection('News').get().then((querySnapshot) => { 
      querySnapshot.forEach((doc) => {
        console.log("doc: ", doc.id)
        this.docId.push(doc.id);
        })
        this.loadingController.dismiss(); 
        this.docIdLength = this.docId.length;  
        console.log("doc length after Insertion: ", this.docIdLength);    
        this.getNewsFeed();
      })
  }

  getNewsFeed()
  {
    for(let i = 0; i < this.docId.length; i++)
    {
      // this.result[i].presenter = "";
      if(this.docId[i] != "newscount")
      {
        this.result[i]={
          title: "",
          description: "",
          url: "",
          postingdate: "",
          hall: ""    
        }
        this.afs.collection('News').doc(this.docId[i]).get().subscribe(result => {
          console.log(result)
          console.log(result.data().presenter);
          this.result[i].title = result.data().title;
          this.result[i].description = result.data().description;
          this.result[i].url = result.data().url;
          this.result[i].postingdate = result.data().postingDate;
          this.result[i].hall = result.data().hall;
        })
      }
    }
    //this.resultLength = this.result.length;
    console.log("docId length : ", this.docId.length);
  }
  
  async presentLoading() {
    console.log("loading");
    const loading = await this.loadingController.create({
      duration: 3000,
      spinner: 'crescent',
      cssClass: 'loaderClass'
    });
    return await loading.present();
  }

  async onRefresh(event)
    {
  
      console.log("refreshing");
      this.getNewsDoc(this.selectedHall);
     
      setTimeout(()=>{
        event.target.complete();
      }, 1500)
    
    }
}
