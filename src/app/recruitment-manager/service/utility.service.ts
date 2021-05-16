import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition, SimpleSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  elements: any[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private _snackBar: MatSnackBar) { }

  public static headerOption() {
    const _headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return { headers: _headers };
  }

  openSnackBar(message: string, action?: string): MatSnackBarRef<SimpleSnackBar>{
    return this._snackBar.open(message, action, {
       duration: 2000,
       horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
     });
   }

   //Filter the list itemms
   public filter(list: Array<string>, value: string): string[] {
    const filterValue = value.toLowerCase();

    return list.filter(fruit => fruit?.toLowerCase().indexOf(filterValue) === 0);
  }
  // private filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.filterCompetences?.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);
  // }
}
