//Angular common/core
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Services
import { DataService } from '../../Services/Data/data.service';
import { TransferService } from 'src/app/Services/Transfer/transfer.service';
//Interfaces
import { Country } from '../../Interfaces/Country';
import { CountryAllData } from 'src/app/Interfaces/CountryAllData';
//Angular Material
import { MatSelectChange } from '@angular/material/select';
//Rxjs
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
//External Library
import * as moment from 'moment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isXsmallScreen$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  //List of countries received from the api
  countries?: Country[];

  //Navbar inputs
  selectedCountry?: string;
  selectedDateFrom?: string;
  selectedDateTo?: string;

  //Property that allows to toggle the date picker
  datePickerVisible: boolean = false;
  rangeSelection?: string;

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

  setDateFrom(date: Date) {
    this.selectedDateFrom = this.formatDate(date);
  }

  setDateTo(date: Date) {
    if (date === null) {
      return;
    }
    this.selectedDateTo = this.formatDate(date);
  }

  //get data per country for a specific date range
  getDataPerCountrySpecific(): Observable<CountryAllData[]> {
    const dataURL = `https://api.covid19api.com/country/${this.selectedCountry}?from=${this.selectedDateFrom}&to=${this.selectedDateTo}`;
    return this.http.get<CountryAllData[]>(dataURL);
  }
  fetchDataPerCountrySpecific(): void {
    this.getDataPerCountrySpecific().subscribe((object) =>
      this.sendApiResponseToChart(object)
    );
  }

  //get all data per country (from the beginning of the pandemic until today)
  getDataPerCountryAll(): Observable<CountryAllData[]> {
    const day1Url = `https://api.covid19api.com/total/dayone/country/${this.selectedCountry}`;
    return this.http.get<CountryAllData[]>(day1Url);
  }
  fetchDataPerCountryAll(): void {
    this.getDataPerCountryAll().subscribe((object) =>
      this.sendApiResponseToChart(object)
    );
  }

  //Send the response of the Api to the Chart Component
  sendApiResponseToChart(data: CountryAllData[]) {
    this.transferService.sendInfo(data);
  }

  showDatePicker() {
    this.datePickerVisible = true;
  }

  hideDatePicker() {
    this.datePickerVisible = false;
  }

  activateTheRightFunction() {
    if (this.datePickerVisible) {
      this.fetchDataPerCountrySpecific();
    } else {
      this.fetchDataPerCountryAll();
    }
  }

  formatDate(date: Date) {
    return moment(date).format('YYYY-MM-DD').concat('T00:00:00.000Z');
  }
}
