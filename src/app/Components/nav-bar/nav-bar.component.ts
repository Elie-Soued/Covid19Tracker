import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../Services/Data/data.service';
import { Country } from '../../Interfaces/Country';
import { MatSelectChange } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  mediaSub?: Subscription;
  deviceXS?: boolean;

  apiResponse?: Country[];
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
    private fb: FormBuilder,
    private mediaObserver: MediaObserver
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

  // Get all the country names from the api
  getCountries(): void {
    this.data
      .getData()
      .subscribe((object) => this.setCountries(object.Countries));
  }

  //Set the countries property with the info coming from the api
  setCountries(data: Country[]) {
    this.countries = data;
  }

  //Getting Info from the Navbar input and storing them into properties
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

  // After updating the needed properties, I send a request to the api
  getDataPerCountry(): Observable<Country[]> {
    const dataURL = `https://api.covid19api.com/country/${this.selectedCountry}/status/${this.selectedCase}?from=${this.selectedDateFrom}&to=${this.selectedDateTo}`;
    return this.http.get<Country[]>(dataURL);
  }

  fetchDataPerCountry(): void {
    this.getDataPerCountry().subscribe((object) => this.setApiResponse(object));
  }

  // and set the api response to a property called apiResponse
  setApiResponse(data: Country[]) {
    this.apiResponse = data;
    console.log(this.apiResponse);
  }

  correctDate(date: Date) {
    let originalDate = date.setMinutes(date.getMinutes());
    let add2Hours = originalDate + 7200000;
    let newDateISOstring = new Date(add2Hours).toISOString();
    return newDateISOstring;
  }
}
