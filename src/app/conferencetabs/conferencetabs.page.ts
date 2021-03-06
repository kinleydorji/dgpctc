import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-conferencetabs',
  templateUrl: './conferencetabs.page.html',
  styleUrls: ['./conferencetabs.page.scss'],
})
export class ConferencetabsPage implements OnInit {
  @ViewChild(IonTabs,{static: false}) tabRef: IonTabs;
  private selectedTab: String;



  private voteOption;
  private resultOption;
  private feedbackOption;
  private announcementLength;
  private newsLength;
  private hall="";
  private selectedHall;
  private badgeCount;
  private newsbadgeCount;
  private localBadgeCount:any;
  private newslocalBadgeCount:any;
  constructor(private router: Router, private afs: AngularFirestore, private route: ActivatedRoute, private storage: Storage) { 
    this.getAnnouncementLength();

  }


  castvote()
  {
    this.router.navigate(['castvote']);
  }

  result()
  {
    this.router.navigate(['result']);
  }

  feedback()
  {
    this.router.navigate(['post-feedback']);
  }

  ngOnInit() {
    this.storage.get('hall').then((hall) => {
      this.selectedHall = hall;
   });

    console.log("hallno:"+this.hall);
    let results;
    this.afs.collection('t_overallStatus').valueChanges().subscribe(result => {
      results = result;
      this.voteOption = results[2].votingStatus;
      console.log("details", results[2].votingStatus);
    })

    this.afs.collection('t_overallStatus').valueChanges().subscribe(result => {
      results = result;
      this.resultOption = results[1].resultStatus;
      console.log("details", results[1].resultStatus);
    })

    this.afs.collection('t_overallStatus').valueChanges().subscribe(result => {
      results = result;
      this.feedbackOption = results[0].feedbackStatus;
      console.log("details", results[0].feedbackStatus);
    })
  }


  getAnnouncementLength()
   {
     this.afs.collection("t_notification").valueChanges().subscribe(data=>{
        this.announcementLength = data.length;
        console.log("announcement count : ", this.announcementLength);
        this.storage.get('badge').then(count=>{
        this.localBadgeCount = count;
        this.badgeCount = parseInt(this.announcementLength) - parseInt(this.localBadgeCount);
        console.log("Badge Count: ", this.badgeCount);
        })
    })
   }


   getNewsLength()
   {
    this.afs.collection("News").valueChanges().subscribe(data=>{
      this.newsLength = data.length;
      console.log("News count : ", this.newsLength);
      this.storage.get('newsbadge').then(count=>{
      this.newslocalBadgeCount = count;
      this.newsbadgeCount = parseInt(this.newsLength) - parseInt(this.newslocalBadgeCount);
      console.log("News Count: ", this.newsbadgeCount);
      })
    }) 
  }


  ionViewWillEnter()
  {
    this.getAnnouncementLength();
    this.getNewsLength();
  }

  getActiveTab()
  {
    console.log();
    if(this.tabRef.getSelected() == "announcements"){
      this.storage.set('badge',this.announcementLength);
      this.getAnnouncementLength();
    }
    else if(this.tabRef.getSelected() == "newsfeed")
    {
      this.storage.set('newsbadge', this.newsLength);
      this.getNewsLength();
    }
  }


}
