import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Response } from '../../Interfaces/Response';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  //This endpoint gives the latest info per country for number of total confirmed and total deaths
  private dataUrl = 'https://covid-api.com/api/regions';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http
      .get<Response>(this.dataUrl)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
