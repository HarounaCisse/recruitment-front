import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/model/offer';
import { OfferService } from '../service/offer.service';

@Injectable({
  providedIn: 'root'
})
export class OfferResolverService implements Resolve<Offer> {

  constructor(private offerService: OfferService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Offer | Observable<Offer> | Promise<Offer> {
    const id = route.paramMap.get('id');
    if(isNaN(+id)){
      return null;
    }
   // return this.cvService.getById(+id);
   return this.getOfferById(+id);
  }
  getOfferById(id: number): Offer | Observable<Offer> | Promise<Offer> {
    return new Promise((resolve, rejects) => {
      this.offerService.getById(id).subscribe(value =>{
        resolve(value);
      }, rejects)
    })
  }
}
