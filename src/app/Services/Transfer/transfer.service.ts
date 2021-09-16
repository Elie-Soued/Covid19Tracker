import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Country } from 'src/app/Interfaces/Country';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private apiResponse = new BehaviorSubject<Country[]>({} as Country[]);
  constructor() {}

  sendInfo(data: Country[]) {
    this.apiResponse.next(data);
  }

  receiveInfo() {
    return this.apiResponse.asObservable();
  }
}
