import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/Data/data.service';
import { TransferService } from 'src/app/Services/Transfer/transfer.service';
import { Country } from '../../Interfaces/Country';
import { ResultPerCountry } from 'src/app/Interfaces/ResultPerCountry';
import { MatSelectChange } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  countries?: Country[];
  cases: string[] = ['confirmed', 'recovered', 'deaths'];
  //Navbar inputs
  selectedCountry?: string;
  selectedDateFrom?: string;
  selectedDateTo?: string;
  selectedCase?: string;

  constructor(
    private data: DataService,
    private http: HttpClient,
    private transferService: TransferService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.getCountries();
  }

  // Get all the country names from the api to use them in the first select
  getCountries(): void {
    this.data
      .getData()
      .subscribe((object) => this.setCountries(object.Countries));
  }
  setCountries(data: Country[]) {
    this.countries = data;
  }

  //Get Info from the Navbar input and storing them into properties
  setSelectedCountry(object: MatSelectChange) {
    this.selectedCountry = object.value;
  }
  setSelectedCase(object: MatSelectChange) {
    this.selectedCase = object.value;
  }
  setDateFrom(date: Date) {
    this.selectedDateFrom = this.correctDate(date);
  }
  setDateTo(date: Date) {
    if (date === null) {
      return;
    }
    this.selectedDateTo = this.correctDate(date);
  }

  //Send a request to the api using the selected properties
  getDataPerCountry(): Observable<ResultPerCountry[]> {
    const dataURL = `https://api.covid19api.com/country/${this.selectedCountry}/status/${this.selectedCase}?from=${this.selectedDateFrom}&to=${this.selectedDateTo}`;
    return this.http.get<ResultPerCountry[]>(dataURL);
  }

  //Send the Api Response to the Chart Component
  fetchDataPerCountry(): void {
    this.getDataPerCountry().subscribe((object) =>
      this.sendApiResponseToChart(object)
    );
  }
  sendApiResponseToChart(data: ResultPerCountry[]) {
    this.transferService.sendInfo(data);
  }

  correctDate(date: Date) {
    let originalDate = date.setMinutes(date.getMinutes());
    let add2Hours = originalDate + 7200000;
    let newDateISOstring = new Date(add2Hours).toISOString();
    return newDateISOstring;
  }
}
