import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/app/model/offer';
import { OfferService } from 'src/app/recruitment-manager/service/offer.service';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {

  offer: Offer;
  constructor(private activeRoute: ActivatedRoute,
    private offerService:OfferService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(param =>{
      let id = +param['id'];
      if(id){
        this.offerService.getById(id).subscribe(data =>
          {
            this.offer = data
          }) ;
      }
     });
  }

}
