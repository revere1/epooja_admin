import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';

export const UsersRoutes: Routes = [{
  path: '',
  component: UsersComponent,
  data: {
    heading: 'Users'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(UsersRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
