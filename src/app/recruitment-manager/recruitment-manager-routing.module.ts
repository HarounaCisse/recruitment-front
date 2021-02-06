import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { CvEditComponent } from './component/cv/cv-edit/cv-edit.component';
// import { CvFormComponent } from './component/cv/cv-form/cv-form.component';
// import { CvListComponent } from './component/cv/cv-list/cv-list.component';
import { OfferDetailComponent } from './component/offer/offer-detail/offer-detail.component';
import { OfferFormComponent } from './component/offer/offer-form/offer-form.component';
import { OfferListComponent } from './component/offer/offer-list/offer-list.component';
import { UserJobListComponent } from './component/offer/user-job-list/user-job-list.component';
import { RecruitmentComponent } from './recruitment.component';
import { CvResolverService } from './resolver/cv-resolver.service';
import { OfferResolverService } from './resolver/offer-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: RecruitmentComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'newOffer',
            component: OfferFormComponent,
          },
          {
            path: '',
            component: OfferListComponent,
          },
          {
            path: ':id',
            component: OfferDetailComponent,
            resolve: {resolved: OfferResolverService}
          },
          {
            path: 'jobsPostule/:id',
            component: UserJobListComponent,
            resolve: { resolvedData: CvResolverService },
          },

        ],
      },
      //
      // {
      //   path: 'cv',
      //   children: [
      //     {
      //       path: 'form',
      //       component: CvFormComponent,
      //     },
      //     { path: 'cv', pathMatch: 'full', redirectTo: '/:id' },
      //     {
      //       path: ':id',
      //       component: CvListComponent,
      //       resolve: { resolvedData: CvResolverService },
      //     },

      //     {
      //       path: ':id/edit',
      //       component: CvEditComponent,
      //       resolve: { resolvedData: CvResolverService },
      //     },
      //   ],
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecruitmentManagerRoutingModule {}
