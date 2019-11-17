import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'registration', loadChildren: './registration/registration.module#RegistrationPageModule', runGuardsAndResolvers:'always' },
  { path: 'user-dashboard', loadChildren: './user-dashboard/user-dashboard.module#UserDashboardPageModule' },
  { path: 'userlogin', loadChildren: './userlogin/userlogin.module#UserloginPageModule' },
  { path: 'changepassword', loadChildren: './changepassword/changepassword.module#ChangepasswordPageModule' },
  { path: 'passwordrecovery', loadChildren: './modal/passwordrecovery/passwordrecovery.module#PasswordrecoveryPageModule' },
  { path: 'overallconference', loadChildren: './overallconference/overallconference.module#OverallconferencePageModule' },
  { path: 'admin-post-notification', loadChildren: './admin-post-notification/admin-post-notification.module#AdminPostNotificationPageModule' },
  { path: 'notification', loadChildren: './notification/notification.module#NotificationPageModule' },
  { path: 'feedback', loadChildren: './feedback/feedback.module#FeedbackPageModule' },
  { path: 'post-feedback', loadChildren: './post-feedback/post-feedback.module#PostFeedbackPageModule' },
  { path: 'internet-status', loadChildren: './internet-status/internet-status.module#InternetStatusPageModule' },
  { path: 'add-notification', loadChildren: './add-notification/add-notification.module#AddNotificationPageModule' },
  { path: 'notification-update/:id', loadChildren: './notification-update/notification-update.module#NotificationUpdatePageModule' },
  { path: 'feedback-update', loadChildren: './feedback-update/feedback-update.module#FeedbackUpdatePageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
