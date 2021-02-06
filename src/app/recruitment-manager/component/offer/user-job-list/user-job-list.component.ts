import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Offer } from 'src/app/model/offer';
import { CvService } from 'src/app/recruitment-manager/service/cv.service';
import { OfferService } from 'src/app/recruitment-manager/service/offer.service';

@Component({
  selector: 'app-user-job-list',
  templateUrl: './user-job-list.component.html',
  styleUrls: ['./user-job-list.component.scss']
})
export class UserJobListComponent implements OnInit {

  userSelectedOffers$: Observable<Offer[]>
  noData: any;
  constructor(private offerService: OfferService,
    private cvService: CvService) { }

  ngOnInit(): void {
    const cvId  = this.cvService.cv.id
    if(cvId){
      this.userSelectedOffers$ = this.offerService.getUserSelectedOffers(+cvId)
                    .pipe(catchError( err => {
                      this.noData = err;
                      return EMPTY;
                    }));
    }
  }

}
