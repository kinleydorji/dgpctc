import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}



  addConference(){
    this.router.navigate(['overallconference']);

  }

  addHall()
  {
    this.router.navigate(['addconferencehall']);
  }
  addAgenda()
  {
    this.router.navigate(['addagenda']);
  }
  addNews()
  {
    this.router.navigate(['addnews']);
  }
}
