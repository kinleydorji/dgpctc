import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConferencetabsPage } from './conferencetabs.page';
import { TabsPageRouterModule } from './tabs-page-router.module';

const routes: Routes = [
  {
    path: '',
    component: ConferencetabsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRouterModule,
  ],
  declarations: [ConferencetabsPage]
})
export class ConferencetabsPageModule {}
