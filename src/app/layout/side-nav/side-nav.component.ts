import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Cv } from 'src/app/model/cv';
import { CvService } from 'src/app/recruitment-manager/service/cv.service';

const SMALL_SIZE  = 720;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  //Attributes
  userCv: Cv
  isOpen!: boolean
  @ViewChild(MatSidenav)sidenav!:MatSidenav;

  constructor(private breakPoint: BreakpointObserver,
    private router: Router,
    private cvService: CvService) {
   }

  ngOnInit(): void {
    // Setting the breakPointObs
    this.userCv = this.cvService.cv
    this.breakPoint.observe(`(max-width:${SMALL_SIZE}px)`)
    .subscribe(state => this.isOpen = state.matches)
  }

  isItSmall(): boolean{
  return this.isOpen
  }

  userJobList(): void{
    this.router.navigate(['/jobsPostule/'+ this.userCv.id])
  }

}
