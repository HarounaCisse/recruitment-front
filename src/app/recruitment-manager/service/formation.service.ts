import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formation } from 'src/app/model/formation';
import { environment, header } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  endPoint() {
    return '/formation';
  }

  private url = environment.serverUrl;
  constructor(private http: HttpClient) {
   }

   addFormation(cvId: number, formation: Formation): Observable<Formation>{
    return this.http.put<Formation>(this.url + this.endPoint() + `/${cvId}`,formation,)
                     // .pipe(tap(x => console.log(x)))
   }

}
