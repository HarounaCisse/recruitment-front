import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Offer } from 'src/app/model/offer';
import { OfferService } from 'src/app/recruitment-manager/service/offer.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss'],
  //To improve performance by minimizing change
  //detection cycles in this case(|async) comp is only
  //checked when a bound observable emit an event
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class OfferListComponent implements OnInit {
  offer: Offer;
  offers$: Observable<Offer[]>;

  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private offerService:OfferService,
    private route:Router) { }

  ngOnInit(): void {
    this.offers$ = this.offerService.getAll();
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
