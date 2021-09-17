import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResultPerCountry } from 'src/app/Interfaces/ResultPerCountry';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private apiResponse = new BehaviorSubject<ResultPerCountry[]>(
    {} as ResultPerCountry[]
  );
  constructor() {}

  sendInfo(data: ResultPerCountry[]) {
    this.apiResponse.next(data);
  }

  receiveInfo() {
    return this.apiResponse.asObservable();
  }
}
