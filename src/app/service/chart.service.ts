import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private chartData = new BehaviorSubject<any>({});
  public chartData$ = this.chartData.asObservable();

  constructor() {}

  sendChartData(data: any) {
    this.chartData.next(data);
  }
}
