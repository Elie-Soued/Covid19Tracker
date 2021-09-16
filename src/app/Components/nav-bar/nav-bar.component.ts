import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../Services/Data/data.service';
import { TransferService } from 'src/app/Services/Transfer/transfer.service';
import { Country } from '../../Interfaces/Country';
import { MatSelectChange } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  mediaSub?: Subscription;
  deviceXS?: boolean;
  countries?: Country[];
  cases: string[] = ['confirmed', 'recovered', 'deaths'];
  //Navbar inputs
  selectedCountry?: string;
  selectedDateFrom?: string;
  selectedDateTo?: string;
  selectedCase?: string;
  //Form controls
  form = new FormGroup({
    country: new FormControl(''),
    caseInput: new FormControl(''),
  });

  constructor(
    private data: DataService,
    private http: HttpClient,
    private mediaObserver: MediaObserver,
    private transferService: TransferService
  ) {}

  ngOnInit(): void {
    this.getCountries();
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        console.log(result.mqAlias);
        this.deviceXS = result.mqAlias === 'xs' ? true : false;
      }
    );
  }

  ngOnDestroy(): void {
    this.mediaSub?.unsubscribe();
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
    this.selectedDateTo = this.correctDate(date);
  }

  //Send a request to the api using the selected properties
  getDataPerCountry(): Observable<Country[]> {
    const dataURL = `https://api.covid19api.com/country/${this.selectedCountry}/status/${this.selectedCase}?from=${this.selectedDateFrom}&to=${this.selectedDateTo}`;
    return this.http.get<Country[]>(dataURL);
  }

  //Send the Api Response to the Chart Component
  fetchDataPerCountry(): void {
    this.getDataPerCountry().subscribe((object) =>
      this.sendApiResponseToChart(object)
    );
  }
  sendApiResponseToChart(data: Country[]) {
    this.transferService.sendInfo(data);
  }

  correctDate(date: Date) {
    let originalDate = date.setMinutes(date.getMinutes());
    let add2Hours = originalDate + 7200000;
    let newDateISOstring = new Date(add2Hours).toISOString();
    return newDateISOstring;
  }
}
