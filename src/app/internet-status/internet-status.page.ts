import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-internet-status',
  templateUrl: './internet-status.page.html',
  styleUrls: ['./internet-status.page.scss'],
})
export class InternetStatusPage implements OnInit {

  constructor(
    private navCtl : NavController,
  ) { }

  ngOnInit() {
  }

  goAddmore(){
    this.navCtl.navigateForward('/add-notification');
  }
}
