import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Offer } from 'src/app/model/offer';
import { environment, header } from 'src/environments/environment';
import { CvService } from './cv.service';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  endPoint() {
    return '/offer';
  }

  private url = environment.serverUrl;
  constructor(private http: HttpClient,
    private userCv: CvService) {
   }

  public getAll(): Observable<Offer[]>{
    const link = encodeURI(this.url + this.endPoint())
    return this.http.get<Offer[]>(link,{headers:header._headers})
                .pipe(tap( x => console.log("All "+JSON.stringify(x))),
                catchError(err => throwError(err)))

  }

  getById(id: number): Observable<Offer> {
    const lien = encodeURI(this.url + this.endPoint()+"/"+id)
    return this.http.get<Offer>(lien,{headers:header._headers})
                      .pipe(catchError(err => throwError(err)))
  }

  addOffer(offer: Offer): Observable<Offer>{
   return this.http.post<Offer>(this.url + this.endPoint(),offer)
  }

  postuler(offerId: number, cvId: number): Observable<void>{
    const lien = encodeURI(this.url + this.userCv.endPoint() + `/${offerId}/${cvId}`);
    return this.http.put<void>(lien, this.userCv.cv)
  }

  public getUserSelectedOffers(id: number): Observable<Offer[]>{
    const link = encodeURI(this.url + this.endPoint() +"/cvId"+ `/${id}`)
    return this.http.get<Offer[]>(link,{headers:header._headers})
                .pipe(tap( x => console.log("user selected offers: "+JSON.stringify(x))),
                catchError(err => throwError(err)))

  }

  private handleError(err): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
