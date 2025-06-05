import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';

interface countryData {
  iso: string;
  name: string;
}

interface coutryDataAll {
  data: countryData[];
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
  dataUrl = 'https://covid-api.com/api/regions';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<coutryDataAll>(this.dataUrl).subscribe((countries) => {
      this.countries = countries.data;
    });
  }

  setSelectedCountry(object: MatSelectChange) {
    this.selectedCountry.emit(object.value);
  }
}
