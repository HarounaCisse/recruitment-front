import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

const SMALL_SIZE  = 720;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  //Attributes
  isOpen!: boolean
  @ViewChild(MatSidenav)sidenav!:MatSidenav;

  constructor(private breakPoint: BreakpointObserver,
    private router: Router) {
   }

  ngOnInit(): void {
    // Setting the breakPointObs
    this.breakPoint.observe(`(max-width:${SMALL_SIZE}px)`)
    .subscribe(state => this.isOpen = state.matches)
  }

  isItSmall(): boolean{
  return this.isOpen
  }

  home(): void{
    this.router.navigate(['/manager'])
  }

}
