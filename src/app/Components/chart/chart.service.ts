import { Injectable } from '@angular/core';
import { Subject, map, forkJoin } from 'rxjs';
import moment from 'moment';
import { HttpClient } from '@angular/common/http';
import state_codes from '../state-select/state-codes';

import {
  initialRawDataGermany,
  rawDataPerState,
  stateCovidStats,
  formattedData,
  stateData,
} from './chart.interface';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  public statesData: stateData = {};
  private data = new Subject<{ name: string; data: formattedData }>();
  public data$ = this.data.asObservable();

  constructor(private http: HttpClient) {}

  async getGermanyData(): Promise<void> {
    const URL_Germany = 'https://api.corona-zahlen.org/germany';
    this.http.get<initialRawDataGermany>(URL_Germany).subscribe((rawData) => {
      const formattedData = this.formatData(rawData);
      this.data.next({
        name: 'Germany',
        data: formattedData,
      });
    });

    this.preloadStateData();
  }

  preloadStateData() {
    const URL_Per_State = 'https://api.corona-zahlen.org/states';
    const observables = state_codes.map((state) => {
      const url = `${URL_Per_State}/${state.code}`;
      return this.http.get<rawDataPerState>(url).pipe(
        map((rawData) => ({
          code: state.code,
          name: rawData.data[state.code].name,
          data: this.formatData(rawData.data[`${state.code}`]),
        }))
      );
    });

    forkJoin(observables).subscribe((result) => {
      result.forEach((res) => {
        this.statesData[res.code] = {
          name: res.name,
          data: res.data,
        };

        console.log('this.statesData :>> ', this.statesData);
      });
    });
  }

  fetchCovidDataPerState(selectedState: string): void {
    this.data.next(this.statesData[selectedState]);
  }

  formatData(raw: initialRawDataGermany | stateCovidStats): formattedData {
    return {
      labels: [moment(raw.hospitalization?.date).format('YYYY-MM-DD')],
      datasets: [[raw.cases], [raw.deaths], [raw.recovered]],
    };
  }
}
