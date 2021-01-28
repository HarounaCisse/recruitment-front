import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Cv } from 'src/app/model/cv';
import { CvService } from '../service/cv.service';

@Injectable({
  providedIn: 'root'
})
export class CvResolverService implements Resolve<Cv>{

  private _currentCv: Cv;

  get currentCv(){
    return this._currentCv;
  }
  set currentCv(cv: Cv){
    this._currentCv = cv
  }
  constructor(private cvService: CvService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Cv | Observable<Cv> | Promise<Cv> {
    const id = route.paramMap.get('id');
    if(isNaN(+id)){
      return null;
    }
   // return this.cvService.getById(+id);
   return this.getCurrentCvById(+id);
  }

  private getCurrentCvById(id: number): Promise<Cv>{
    return new Promise((resolve, reject) => {
      this.cvService.getById(id).subscribe( data => {
        //this._currentCv = data;
        this.cvService.cv = data
        resolve(data);
      }, reject)
    })
  }
}
