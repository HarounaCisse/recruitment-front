import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from 'src/app/model/offer';
import { OfferService } from 'src/app/recruitment-manager/service/offer.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {
  offer: Offer;
  offers: Offer[]=[];
  constructor(private offerService:OfferService,
    private route:Router) { }

  ngOnInit(): void {
    this.offerService.getAll().subscribe((data) => {
      this.offers = data? data : [];
      // console.log(data);
    }, (err)=>{
      console.log("probleme : ", err)
   })
  }

  detail(){
    this.route.navigate(['/id',this.offer.id])
  }
  showAdd(){}

}
