import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import moment from 'moment';
import { type rawCountryData } from '../nav-bar/nav-bar.component';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private chartData = new BehaviorSubject<any>({});
  public chartData$ = this.chartData.asObservable();

  sendRawData(raw: rawCountryData) {
    const formattedData = this.formatData(raw);
    this.chartData.next(formattedData);
  }

  formatData(raw: rawCountryData) {
    return {
      labels: [moment(raw.data.date).format('YYYY-MM-DD')],
      datasets: [[raw.data.confirmed], [raw.data.deaths], [raw.data.active]],
    };
  }
}
