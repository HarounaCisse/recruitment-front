import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Offer } from 'src/app/model/offer';
import { environment, header } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  endPoint() {
    return '/offer';
  }

  private url = environment.serverUrl;
  constructor(private http: HttpClient) {
   }

  public getAll(): Observable<Offer[]>{
    const link = encodeURI(this.url + this.endPoint())
    return this.http.get<Offer[]>(link,{headers:header._headers})
                .pipe(tap( x => console.log("All "+JSON.stringify(x))),
                catchError(err => throwError(err)))

  }

  getById(id: number): Observable<Offer> {
    const lien = encodeURI(this.url + this.endPoint()+`/${id}`)
    return this.http.get<Offer>(lien,{headers:header._headers})
                      .pipe(catchError(err => throwError(err)))
  }

  addOffer(offer: Offer): Observable<Offer>{
   return this.http.post<Offer>(this.url + this.endPoint(),offer)
  }
}
