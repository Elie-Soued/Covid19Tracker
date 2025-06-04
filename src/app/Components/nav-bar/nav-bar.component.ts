import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferService } from 'src/app/Services/Transfer/transfer.service';
import { CountryAllData } from 'src/app/Interfaces/CountryAllData';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: false,
})
export class NavBarComponent {
  selectedCountry?: string;

  constructor(
    private http: HttpClient,
    private transferService: TransferService
  ) {}

  setSelectedCountry(object: string) {
    this.selectedCountry = object;
  }

  //get all data from the beginning of the pandemic per country
  fetchDataPerCountryAll(): void {
    const day1Url = `https://covid-api.com/api/reports/total?iso=${this.selectedCountry}`;
    this.http
      .get<CountryAllData[]>(day1Url, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .subscribe((object) => {
        this.transferService.sendInfo(object);
      });
  }
}
