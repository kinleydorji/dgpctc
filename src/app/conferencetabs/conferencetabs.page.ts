import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-conferencetabs',
  templateUrl: './conferencetabs.page.html',
  styleUrls: ['./conferencetabs.page.scss'],
})
export class ConferencetabsPage implements OnInit {
  private voteOption;
  private hall="";
  constructor(private router: Router, private afs: AngularFirestore, private route: ActivatedRoute) { }

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
