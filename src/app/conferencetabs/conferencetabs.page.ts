import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-conferencetabs',
  templateUrl: './conferencetabs.page.html',
  styleUrls: ['./conferencetabs.page.scss'],
})
export class ConferencetabsPage implements OnInit {
  private voteOption;
  constructor(private router: Router, private afs: AngularFirestore) { }

  castvote()
  {
    this.router.navigate(['castvote']);
  }

  ngOnInit() {
    let results;
    this.afs.collection('t_overallStatus').valueChanges().subscribe(result => {
      results = result;
      this.voteOption = results[0].votingStatus;
      console.log("details", results[0].votingStatus);
    })
  }



}
