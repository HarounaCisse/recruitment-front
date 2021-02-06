import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/model/offer';
import { CvService } from 'src/app/recruitment-manager/service/cv.service';
import { OfferService } from 'src/app/recruitment-manager/service/offer.service';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {

  offer$: Observable<Offer>;

  panelOpenState = false;
  constructor(private activeRoute: ActivatedRoute,
    private offerService:OfferService,
    private cvService: CvService,
    private route: Router) { }

  ngOnInit(): void {
    const paramId = +this.activeRoute.snapshot.paramMap.get('id');
    console.log(paramId)
    this.offer$ = this.offerService.getById(paramId);
     console.log(this.offer$)
  }

  postuler(id: number){
    this.offerService.postuler(id, this.cvService.cv.id).subscribe(()=>{
      this.route.navigate(['/offers']);
    })
  }

}
