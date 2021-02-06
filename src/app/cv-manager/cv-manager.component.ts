import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cv-manager',
  templateUrl: './cv-manager.component.html',
  styleUrls: ['./cv-manager.component.scss']
})
export class CvManagerComponent implements OnInit {
  sideBarOpen: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
