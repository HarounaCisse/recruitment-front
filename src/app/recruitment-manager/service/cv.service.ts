import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Cv } from 'src/app/model/cv';
import { environment, header } from 'src/environments/environment';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  endPoint() {
    return '/cv';
  }

  private url = environment.serverUrl;
  private _cv : Cv;
  private option = UtilityService.headerOption();

  constructor(private http: HttpClient) {
   }

   public get cv(){
     return this._cv;
   }

   public set cv(v : Cv) {
     this._cv = v;
   }


  public getAll(): Observable<Cv[]>{
    const link = encodeURI(this.url + this.endPoint())
    return this.http.get<Cv[]>(link,{headers:header._headers})
                .pipe(tap( x => console.log("All "+JSON.stringify(x))),
                catchError(err => throwError(err)))

  }

  getById(id: number): Observable<Cv> {
    const lien = encodeURI(this.url + this.endPoint()+`/${id}`)
    return this.http.get<Cv>(lien,{headers:header._headers})
                .pipe(catchError(err => throwError(err)));

  }
  // userCreatedCv(id: number): Observable<Cv> {
  //   const lien = encodeURI(this.url + this.endPoint()+`/${id}`);
  //   return this.http.get<Cv>(lien,{headers:header._headers})
  //             .pipe(map(() => this.currentCv = id))
  // }
  public find(id: number) {
    const lien = encodeURI(this.url + this.endPoint() + "/" + id);
    return this.http
      .get<Cv>(lien, this.option)
      .pipe(catchError(err => throwError(err)));
  }

  addCv(cv: Cv): Observable<Cv>{
   return this.http.post<Cv>(this.url + this.endPoint(),cv)
                    .pipe(tap(x => this.cv = x))
                    // map(() => this.cv = cv))
  }

  upDate(cvId: number, cv: Cv): Observable<Cv>{
    return this.http.put<Cv>(this.url + this.endPoint() + `/${cvId}`,cv)

   }
}
