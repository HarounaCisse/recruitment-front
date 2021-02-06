import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvManagerRoutingModule } from './cv-manager-routing.module';
import { CvManagerComponent } from './cv-manager.component';
import { CvListComponent } from '../recruitment-manager/component/cv/cv-list/cv-list.component';
import { CvFormComponent } from '../recruitment-manager/component/cv/cv-form/cv-form.component';
import { CvEditComponent } from '../recruitment-manager/component/cv/cv-edit/cv-edit.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CvManagerComponent,
    CvListComponent,
    CvFormComponent,
    CvEditComponent,],
  imports: [
    CommonModule,
    SharedModule,
    CvManagerRoutingModule
  ]
})
export class CvManagerModule { }
