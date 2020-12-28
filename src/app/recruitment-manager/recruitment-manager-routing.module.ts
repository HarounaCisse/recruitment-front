import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContentComponent } from '../layout/main-content/main-content.component';
import { CvFormComponent } from './component/cv/cv-form/cv-form.component';
import { OfferDetailComponent } from './component/offer/offer-detail/offer-detail.component';
import { OfferListComponent } from './component/offer/offer-list/offer-list.component';
import { RecruitmentComponent } from './recruitment.component';

const routes: Routes = [
  {
    path: '',
    component: RecruitmentComponent,
    children: [
      {
        path: '',
        component: OfferListComponent,
      },
      // {
      //   path: ':id', component: OfferDetailComponent
      // },
      {
        path: 'cv',
        component: CvFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecruitmentManagerRoutingModule {}
