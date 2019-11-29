import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PasswordrecoveryPage } from './passwordrecovery.page';

const routes: Routes = [
  {
    path: '',
    component: PasswordrecoveryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PasswordrecoveryPage]
})
export class PasswordrecoveryPageModule {}
