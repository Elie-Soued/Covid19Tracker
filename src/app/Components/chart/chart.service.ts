import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import moment from 'moment';
import { HttpClient } from '@angular/common/http';

import {
  initialRawDataGermany,
  rawDataPerState,
  stateCovidStats,
  formattedData,
} from './chart.interface';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private chartData = new BehaviorSubject<any>({});
  private state = new BehaviorSubject<string>('');
  private isLoading = new Subject<void>();

  public chartData$ = this.chartData.asObservable();
  public state$ = this.state.asObservable();
  public load$ = this.isLoading.asObservable();

  private URL_Germany = 'https://api.corona-zahlen.org/germany';
  private URL_Per_State = 'https://api.corona-zahlen.org/states';

  constructor(private http: HttpClient) {}

  getInitialData(): void {
    this.http
      .get<initialRawDataGermany>(this.URL_Germany)
      .subscribe((rawData) => {
        const formattedData = this.formatData(rawData);
        this.chartData.next(formattedData);
      });
  }

  fetchCovidDataPerState(selectedState: string): void {
    const url = `${this.URL_Per_State}/${selectedState}`;

    this.isLoading.next();

    this.http.get<rawDataPerState>(url).subscribe((rawData) => {
      const formattedData = this.formatData(rawData.data[`${selectedState}`]);
      this.chartData.next(formattedData);
      this.state.next(rawData.data[selectedState].name);
    });
  }

  formatData(raw: initialRawDataGermany | stateCovidStats): formattedData {
    return {
      labels: [moment(raw.hospitalization?.date).format('YYYY-MM-DD')],
      datasets: [[raw.cases], [raw.deaths], [raw.recovered]],
    };
  }
}
