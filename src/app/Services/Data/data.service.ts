import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Response } from '../../Interfaces/Response';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUrl = 'https://api.covid19api.com/summary';
  constructor(private http: HttpClient) {}

  getData(): Observable<Response> {
    return this.http
      .get<Response>(this.dataUrl)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
