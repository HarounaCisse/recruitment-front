import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Competence } from 'src/app/model/competence';
import { environment } from 'src/environments/environment';
import { UtilityService } from './utility.service';

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

   addCompetence(cvId: number, competence: Competence): Observable<Competence>{
    return this.http.put<Competence>(encodeURI(this.url + this.endPoint() + `/${cvId}`),competence,)
   }
  //  addCompetence2(competence: Competence): Observable<Competence>{
  //   return this.http.post<Competence>(encodeURI(this.url + this.endPoint()),competence,)
  //  }
}
