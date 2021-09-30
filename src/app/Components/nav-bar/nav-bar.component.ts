//Angular common/core
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//Services
import { TransferService } from 'src/app/Services/Transfer/transfer.service';
//Interfaces
import { CountryAllData } from 'src/app/Interfaces/CountryAllData';
//Rxjs
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
//Angular cdk
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
//External Library
import * as moment from 'moment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  //Observable that return true if the screen is Xsmall
  isXsmallScreen$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  //Navbar inputs
  selectedCountry?: string;
  selectedDateFrom?: string;
  selectedDateTo?: string;

  //Property that allows to toggle the date picker
  datePickerVisible: boolean = false;
  rangeSelection?: string;

  constructor(
    private http: HttpClient,
    private transferService: TransferService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {}

  //Setters
  //-------

  setSelectedCountry(object: string) {
    this.selectedCountry = object;
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
  setRangeSelection(range: string) {
    this.rangeSelection = range;
  }

  //Api Calls
  //---------

  //get for a specific date range per country
  getDataPerCountrySpecific(): Observable<CountryAllData[]> {
    const dataURL = `https://api.covid19api.com/country/${this.selectedCountry}?from=${this.selectedDateFrom}&to=${this.selectedDateTo}`;
    return this.http.get<CountryAllData[]>(dataURL);
  }
  fetchDataPerCountrySpecific(): void {
    this.getDataPerCountrySpecific().subscribe((object) =>
      this.sendApiResponseToChart(object)
    );
  }

  //get all data from the beginning of the pandemic per country
  getDataPerCountryAll(): Observable<CountryAllData[]> {
    const day1Url = `https://api.covid19api.com/total/dayone/country/${this.selectedCountry}`;
    return this.http.get<CountryAllData[]>(day1Url);
  }
  fetchDataPerCountryAll(): void {
    this.getDataPerCountryAll().subscribe((object) =>
      this.sendApiResponseToChart(object)
    );
  }

  //Helper Functions
  //----------------

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

  disableButton() {
    if (
      !this.rangeSelection ||
      (this.rangeSelection === 'specificDates' &&
        (!this.selectedDateFrom || !this.selectedDateTo))
    ) {
      return true;
    } else {
      return false;
    }
  }
}
