import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Competence } from 'src/app/model/competence';
import { environment } from 'src/environments/environment';
import { UtilityService } from './utility.service';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CompetenceService {
  endPoint() {
    return '/competence';
  }

  private url = environment.serverUrl;
  private option = UtilityService.headerOption();

  constructor(private http: HttpClient) {
   }

   competencesList$ = this.http.get<Competence[]>(
    encodeURI(this.url + this.endPoint())
   )

   addCompetence(cvId: number, competence: Competence[]): Observable<Competence>{
     //console.log(" THE DATA CONTENT: "+(encodeURI(this.url + this.endPoint() + `/${cvId}`)).concat(' ') +competence.values)
    return this.http.put<Competence>(encodeURI(this.url + this.endPoint() + `/${cvId}`),competence,)
   }
   public getUserCompetences(id: number): Observable<Competence[]>{
    const link = encodeURI(this.url + this.endPoint() + `/${id}`)
    return this.http.get<Competence[]>(link,this.option)
                .pipe(tap( x => console.log("All "+JSON.stringify(x))),
                catchError(err => throwError(err)))

  }
}
