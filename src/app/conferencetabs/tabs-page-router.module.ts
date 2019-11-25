import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConferencetabsPage } from './conferencetabs.page';


const routes: Routes = [
  {
    path: 'conferencetabs/:hallno',
    component: ConferencetabsPage,
    children: [
      {
        path: 'agenda',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../agenda/agenda.module').then(m => m.AgendaPageModule)
          }
        ]
      },
      {
        path: 'newsfeed',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../newsfeed/newsfeed.module').then(m => m.NewsfeedPageModule)
          }
        ]
      },
      {
        path: 'announcements',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../announcements/announcements.module').then(m => m.AnnouncementsPageModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/conferencetabs/agenda',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRouterModule { }
