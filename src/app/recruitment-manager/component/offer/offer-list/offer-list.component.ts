import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
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

  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

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

  ngAfterViewInit() {
    //this should be implemented
     this.paginator
  }

  detail(){
    this.route.navigate(['/id',this.offer.id])
  }
  showAdd(){}

}
