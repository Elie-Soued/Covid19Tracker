import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartService } from 'src/app/Components/chart/chart.service';

export interface rawCountryData {
  data: {
    active: number;
    active_diff: number;
    confirmed: number;
    confirmed_diff: number;
    date: string;
    deaths: number;
    deaths_diff: number;
    fatality_rate: number;
    last_update: string;
    recovered: number;
    recovered_diff: number;
  };
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: false,
})
export class NavBarComponent {
  selectedCountry?: string;

  constructor(private http: HttpClient, private chartService: ChartService) {}

  setSelectedCountry(country: string) {
    this.selectedCountry = country;
  }

  fetchCovidDataPerCountry(): void {
    const url = `https://covid-api.com/api/reports/total?iso=${this.selectedCountry}`;
    this.http
      .get<rawCountryData>(url, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .subscribe((rawData) => {
        this.chartService.sendRawData(rawData);
      });
  }
}
