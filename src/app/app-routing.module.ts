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
  { path: 'passwordrecovery', loadChildren: './modal/passwordrecovery/passwordrecovery.module#PasswordrecoveryPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
