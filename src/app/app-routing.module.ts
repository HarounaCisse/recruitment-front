import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'offers' },
  {
    path: 'offers',
    loadChildren:  './recruitment-manager/recruitment-manager.module#RecruitmentManagerModule'
  },
  {
    path: 'cv',
    loadChildren:  './cv-manager/cv-manager.module#CvManagerModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
