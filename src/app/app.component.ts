import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  private isConfThere = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Add User',
      url: '/registration',
      icon: 'person-add'
    },
    {
      title: 'User login',
      url:'/userlogin',
      icon: 'lock'
    },
    {
      title: 'Add Notification',
      url:'/add-notification',
      icon: 'notifications'
    },
    {
      title: 'Update Feedback',
      url:'/feedback-update',
      icon: 'quote'
    },
    {
      title: 'Create Poll',
      url:'/createpoll',
      icon: 'checkbox-outline'
    },
    {
      title: 'conference',
      url:'/conferencetabs',
      icon: 'people'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afs: AngularFirestore,
  ) {
    this.getConferenceDetails();
    this.initializeApp();
  }
  getConferenceDetails()
  {
    this.afs.collection<any>('conference',ref => ref.where('id','==','1'))
    .valueChanges().subscribe(data =>{     
        if(data.length > 0)
        {
          this.isConfThere = 1;
        };
       })
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.getConferenceDetails();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
