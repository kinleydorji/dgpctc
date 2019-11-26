import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  private voteResult;
  private cardColors =[];
  private temp;
  constructor(private afs: AngularFirestore) { 

    this.cardColors = ["#b8dfca", "#fbf8e6", "#e6e6fa", "#fff7f6", "#e8f4f8"];
  }



  ngOnInit() {
    this.afs.collection('t_poll').valueChanges().subscribe(result => {
      this.voteResult = result;
      console.log("details", this.voteResult);
      for(let i = 0; i < this.voteResult.length; i++)
      {
        for(let j = i + 1; j < this.voteResult.length; j++)
        {
          if(this.voteResult[i].voteCount < this.voteResult[j].voteCount)
          {
            this.temp = this.voteResult[i];
            this.voteResult[i] = this.voteResult[j];
            this.voteResult[j] = this.temp;
          }
        }
      }

      console.log("Sorted : ", this.voteResult);
    })
  }



}
