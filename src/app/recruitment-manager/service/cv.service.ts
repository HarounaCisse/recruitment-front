import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Cv } from 'src/app/model/cv';
import { environment, header } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  endPoint() {
    return '/cv';
  }

  private url = environment.serverUrl;
  constructor(private http: HttpClient) {
   }

  public getAll(): Observable<Cv[]>{
    const link = encodeURI(this.url + this.endPoint())
    return this.http.get<Cv[]>(link,{headers:header._headers})
                .pipe(tap( x => console.log("All "+JSON.stringify(x))),
                catchError(err => throwError))

  }

  getById(id: number): Observable<Cv> {
    const lien = encodeURI(this.url + this.endPoint()+`/${id}`)
    return this.http.get<Cv>(lien,{headers:header._headers})
  }

  addCv(cv: Cv): Observable<Cv>{
   return this.http.post<Cv>(this.url + this.endPoint(),cv)
                    // .pipe(tap(x => console.log(x)))
  }
}
