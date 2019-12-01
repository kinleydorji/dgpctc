import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-conferencetabs',
  templateUrl: './conferencetabs.page.html',
  styleUrls: ['./conferencetabs.page.scss'],
})
export class ConferencetabsPage implements OnInit {
  private voteOption;
  private resultOption;
  private feedbackOption;

  private hall="";
  private selectedHall;
  constructor(private router: Router, private afs: AngularFirestore, private route: ActivatedRoute, private storage: Storage) { 
   
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



}
