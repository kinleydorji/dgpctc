import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AdminPostNotificationPage } from './admin-post-notification.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPostNotificationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminPostNotificationPage]
})
export class AdminPostNotificationPageModule {}
