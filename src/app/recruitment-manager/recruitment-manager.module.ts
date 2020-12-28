import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruitmentManagerRoutingModule } from './recruitment-manager-routing.module';
import { RecruitmentComponent } from './recruitment.component';

import { OfferListComponent } from './component/offer/offer-list/offer-list.component';
import { OfferFormComponent } from './component/offer/offer-form/offer-form.component';
import { CvFormComponent } from './component/cv/cv-form/cv-form.component';
import { CvListComponent } from './component/cv/cv-list/cv-list.component';
import { SharedModule } from '../shared/shared.module';
import { OfferDetailComponent } from './component/offer/offer-detail/offer-detail.component';


@NgModule({
  declarations: [
    RecruitmentComponent,
    OfferListComponent,
    OfferFormComponent,
    CvListComponent,
    CvFormComponent,
    OfferDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    RecruitmentManagerRoutingModule
  ]
})
export class RecruitmentManagerModule { }
