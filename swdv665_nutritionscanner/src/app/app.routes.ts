import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },  {
    path: 'user',
    loadComponent: () => import('./user/user.page').then( m => m.UserPage)
  },
  {
    path: 'scan',
    loadComponent: () => import('./scan/scan.page').then( m => m.ScanPage)
  },
  {
    path: 'history',
    loadComponent: () => import('./history/history.page').then( m => m.HistoryPage)
  },
  {
    path: 'user-profile',
    loadComponent: () => import('./user-profile/user-profile.page').then( m => m.UserProfilePage)
  },
  {
    path: 'create-user',
    loadComponent: () => import('./create-user/create-user.page').then( m => m.CreateUserPage)
  },

];
