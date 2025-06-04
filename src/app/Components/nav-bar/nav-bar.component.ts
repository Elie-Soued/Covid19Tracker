import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferService } from 'src/app/Services/Transfer/transfer.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: false,
})
export class NavBarComponent {
  selectedCountry?: string;
  @Output() setChartData = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    private transferService: TransferService
  ) {}

  setSelectedCountry(object: string) {
    this.selectedCountry = object;
  }

  fetchDataPerCountryAll(): void {
    const day1Url = `https://covid-api.com/api/reports/total?iso=${this.selectedCountry}`;
    this.http
      .get<any>(day1Url, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .subscribe((object) => {
        this.transferService.sendInfo(object);
      });
  }
}
