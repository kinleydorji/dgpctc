import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPageRouterModule } from './conferencetabs/tabs-page-router.module';
import { ConferencetabsPage } from './conferencetabs/conferencetabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'registration', loadChildren: './registration/registration.module#RegistrationPageModule', runGuardsAndResolvers:'always' },
  { path: 'user-dashboard', loadChildren: './user-dashboard/user-dashboard.module#UserDashboardPageModule' },
  { path: 'userlogin', loadChildren: './userlogin/userlogin.module#UserloginPageModule' },
  { path: 'changepassword', loadChildren: './changepassword/changepassword.module#ChangepasswordPageModule' },
  { path: 'passwordrecovery', loadChildren: './modal/passwordrecovery/passwordrecovery.module#PasswordrecoveryPageModule' },
  { path: 'overallconference', loadChildren: './overallconference/overallconference.module#OverallconferencePageModule' },
  { path: 'admin-post-notification', loadChildren: './admin-post-notification/admin-post-notification.module#AdminPostNotificationPageModule' },
  { path: 'feedback', loadChildren: './feedback/feedback.module#FeedbackPageModule' },
  { path: 'post-feedback', loadChildren: './post-feedback/post-feedback.module#PostFeedbackPageModule' },
  { path: 'internet-status', loadChildren: './internet-status/internet-status.module#InternetStatusPageModule' },
  { path: 'add-notification', loadChildren: './add-notification/add-notification.module#AddNotificationPageModule' },
  { path: 'notification-update/:id', loadChildren: './notification-update/notification-update.module#NotificationUpdatePageModule' },
  { path: 'feedback-update', loadChildren: './feedback-update/feedback-update.module#FeedbackUpdatePageModule' },
  { path: 'createpoll', loadChildren: './createpoll/createpoll.module#CreatepollPageModule' },
  { path: 'conferencetabs', loadChildren: './conferencetabs/conferencetabs.module#ConferencetabsPageModule' },
  { path: '', loadChildren: './conferencetabs/conferencetabs.module#ConferencetabsPageModule' },
  { path: 'castvote', loadChildren: './castvote/castvote.module#CastvotePageModule' },
  { path: 'registration', loadChildren: './registration/registration.module#RegistrationPageModule', runGuardsAndResolvers:'always' },
  { path: 'user-dashboard', loadChildren: './user-dashboard/user-dashboard.module#UserDashboardPageModule' },
  { path: 'userlogin', loadChildren: './userlogin/userlogin.module#UserloginPageModule' },
  { path: 'changepassword', loadChildren: './changepassword/changepassword.module#ChangepasswordPageModule' },
  { path: 'feedback', loadChildren: './feedback/feedback.module#FeedbackPageModule' },
  { path: 'post-feedback', loadChildren: './post-feedback/post-feedback.module#PostFeedbackPageModule' },
  { path: 'feedback-update', loadChildren: './feedback-update/feedback-update.module#FeedbackUpdatePageModule' },
  { path: 'editconference', loadChildren: './editconference/editconference.module#EditconferencePageModule' },
  { path: 'addconferencehall', loadChildren: './addconferencehall/addconferencehall.module#AddconferencehallPageModule' },
  { path: 'addagenda', loadChildren: './addagenda/addagenda.module#AddagendaPageModule' },
  { path: 'addnews', loadChildren: './addnews/addnews.module#AddnewsPageModule' },
  { path: 'conferenceselect', loadChildren: './conferenceselect/conferenceselect.module#ConferenceselectPageModule' },
  { path: 'result', loadChildren: './result/result.module#ResultPageModule' },



  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
