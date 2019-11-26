import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConferenceselectPage } from './conferenceselect.page';

const routes: Routes = [
  {
    path: '',
    component: ConferenceselectPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConferenceselectPage]
})
export class ConferenceselectPageModule {}
