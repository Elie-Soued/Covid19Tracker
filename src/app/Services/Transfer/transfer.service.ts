import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CountryAllData } from 'src/app/Interfaces/CountryAllData';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private apiResponse = new BehaviorSubject<CountryAllData[]>(
    {} as CountryAllData[]
  );
  constructor() {}

  sendInfo(data: CountryAllData[]) {
    this.apiResponse.next(data);
  }

  receiveInfo() {
    return this.apiResponse.asObservable();
  }
}
