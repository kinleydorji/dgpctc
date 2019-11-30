import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConferencetabsPage } from './conferencetabs.page';


const routes: Routes = [
  {
    path: 'conferencetabs',
    component: ConferencetabsPage,
    children: [
      {
        path: 'user-dashboard',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../user-dashboard/user-dashboard.module').then(m => m.UserDashboardPageModule)
          }
        ]
      },
      {
        path: 'conferenceselect',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../conferenceselect/conferenceselect.module').then(m => m.ConferenceselectPageModule)
          },
          {
            path: ':id',
            loadChildren: () =>
              import('../agenda/agenda.module').then(m => m.AgendaPageModule)
          },
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
    redirectTo: '/conferencetabs/user-dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRouterModule { }
