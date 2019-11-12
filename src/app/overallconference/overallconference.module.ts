import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OverallconferencePage } from './overallconference.page';

const routes: Routes = [
  {
    path: '',
    component: OverallconferencePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OverallconferencePage]
})
export class OverallconferencePageModule {}
