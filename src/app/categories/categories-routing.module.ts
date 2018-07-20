import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';

export const CategoriesRoutes: Routes = [{
  path: '',
  component: CategoriesComponent,
  data: {
    heading: 'Categories'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(CategoriesRoutes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
