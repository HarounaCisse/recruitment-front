import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Competence } from 'src/app/model/competence';
import { Cv } from 'src/app/model/cv';
import { CompetenceService } from 'src/app/recruitment-manager/service/competence.service';
import { CvService } from 'src/app/recruitment-manager/service/cv.service';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.scss']
})
export class CvListComponent implements OnInit {
  cv : Cv;
  competenceList: Competence[]
  constructor(private cvService: CvService,
    private router: Router,
    private userCompetence: CompetenceService,
    ) { }

  ngOnInit(): void {
    //this.cv = this.cvService.cv;
    if(this.cvService.cv){
      this.cv = this.cvService.cv;
      //console.log("first cv: "+this.cv);
      this.getUserCompList(this.cv.id)
      console.log("List Com: "+this.competenceList);
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

  async getUserCompList(cvId: number){
   this.userCompetence.getUserCompetences(cvId)
   .subscribe(data => {
    this.competenceList = data
   })
  }

}
