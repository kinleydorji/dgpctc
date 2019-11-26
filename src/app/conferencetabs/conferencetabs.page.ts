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
  private hall="";
  private selectedHall;
  constructor(private router: Router, private afs: AngularFirestore, private route: ActivatedRoute, private storage: Storage) { 
   
  }

  castvote()
  {
    this.router.navigate(['castvote']);
  }

  ngOnInit() {
    this.storage.get('hall').then((hall) => {
      this.selectedHall = hall;
   });
    console.log("hallno:"+this.hall);
    let results;
    this.afs.collection('t_overallStatus').valueChanges().subscribe(result => {
      results = result;
      this.voteOption = results[0].votingStatus;
      console.log("details", results[0].votingStatus);
    })
  }



}
