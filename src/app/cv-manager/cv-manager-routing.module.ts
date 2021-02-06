import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CvEditComponent } from '../recruitment-manager/component/cv/cv-edit/cv-edit.component';
import { CvFormComponent } from '../recruitment-manager/component/cv/cv-form/cv-form.component';
import { CvListComponent } from '../recruitment-manager/component/cv/cv-list/cv-list.component';
import { CvResolverService } from '../recruitment-manager/resolver/cv-resolver.service';
import { CvManagerComponent } from './cv-manager.component';

const routes: Routes = [
  {
    path: '',
    component: CvManagerComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            component: CvListComponent,
           // resolve: { resolvedData: CvResolverService },
          },

          {
            path: 'form',
            component: CvFormComponent,
          },
          {
            path: ':id',
            component: CvListComponent,
            resolve: { resolvedData: CvResolverService },
          },
          // { path: 'cv', pathMatch: 'full', redirectTo: 'cv/:id' },
          {
            path: ':id/edit',
            component: CvEditComponent,
            resolve: { resolvedData: CvResolverService },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvManagerRoutingModule { }
