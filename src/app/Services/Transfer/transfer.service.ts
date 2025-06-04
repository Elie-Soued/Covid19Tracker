import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private apiResponse = new BehaviorSubject<any>({} as any);
  constructor() {}

  sendInfo(data: any) {
    this.apiResponse.next(data);
  }

  receiveInfo() {
    return this.apiResponse.asObservable();
  }
}
