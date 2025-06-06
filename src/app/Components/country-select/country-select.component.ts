import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';

interface countryData {
  locID: number;
  location: string;
  iso2Code: string;
  iso3Code: string;
}

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.css'],
  standalone: false,
})
export class CountrySelectComponent implements OnInit {
  countries: countryData[] = [];
  @Output() selectedCountry = new EventEmitter<string>();
  dataUrl = 'https://world-demographics.p.rapidapi.com/countries ';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<countryData[]>(this.dataUrl, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'x-rapidapi-host': 'world-demographics.p.rapidapi.com',
          'x-rapidapi-key':
            'c7cab83da8msh6781f9a7195f18dp174e30jsndaed02d597e2',
        },
      })
      .subscribe((countries) => {
        this.countries = countries;
      });
  }

  setSelectedCountry(object: MatSelectChange) {
    this.selectedCountry.emit(object.value);
  }
}
