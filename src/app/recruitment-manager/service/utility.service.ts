import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition, SimpleSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

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
}
