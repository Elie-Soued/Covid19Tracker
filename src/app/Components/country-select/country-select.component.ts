import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.css'],
  standalone: false,
})
export class CountrySelectComponent implements OnInit {
  countries?: any;
  @Output() selectedCountry = new EventEmitter<string>();
  private dataUrl = 'https://covid-api.com/api/regions';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>(this.dataUrl).subscribe((object) => {
      this.countries = object.data;
    });
  }

  setSelectedCountry(object: MatSelectChange) {
    this.selectedCountry.emit(object.value);
  }
}
