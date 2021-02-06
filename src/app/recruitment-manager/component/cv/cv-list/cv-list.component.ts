import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cv } from 'src/app/model/cv';
import { CvService } from 'src/app/recruitment-manager/service/cv.service';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.scss']
})
export class CvListComponent implements OnInit {
  cv : Cv;
  constructor(private cvService: CvService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.cv = this.cvService.cv;
    if(this.cvService.cv){
      this.cv = this.cvService.cv;
      console.log("first cv: "+this.cv);
    }else{
      this.cv = null
     // this.cv.id = 0;
      console.log("second cv: "+this.cv);
    }
  }

  create(){
    this.router.navigateByUrl("/cv/form");
  }

  edit(){
    this.router.navigate(['/cv/'+this.cv.id+'/edit'])
    //this.route.data.subscribe( data => this.cv = data['resolvedData'])
  }

}
