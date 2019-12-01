import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddconferencehallPage } from './addconferencehall.page';

const routes: Routes = [
  {
    path: '',
    component: AddconferencehallPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddconferencehallPage]
})
export class AddconferencehallPageModule {}
