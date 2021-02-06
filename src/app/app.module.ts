import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecruitmentManagerModule } from './recruitment-manager/recruitment-manager.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CvManagerModule } from './cv-manager/cv-manager.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RecruitmentManagerModule,
    CvManagerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
