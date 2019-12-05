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
  private documents:any = [];
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
      this.documents = [];
       this.afs.collection('/News',ref=>ref.orderBy('id', 'desc')).get().subscribe(res=>
        {
          res.forEach((doc:any)=>
          {
            this.documents.push({
              title : doc.data().title,
              description : doc.data().description,
              postingDate : doc.data().postingDate,
              hall : doc.data().hall,
              url : doc.data().url
            })

          })
        })
      console.log("Documents : ", this.documents);
  }

  
  async presentLoading() {
    console.log("loading");
    const loading = await this.loadingController.create({
      duration: 1500,
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
