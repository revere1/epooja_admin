import { Routes } from '@angular/router';

import { SigninComponent } from './signin/signin.component';

import { LockscreenComponent } from './lockscreen/lockscreen.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'signin',
      component: SigninComponent
    },{
      path: 'lockscreen',
      component: LockscreenComponent
    }]
  }
];
