import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { DataService } from '../../Services/Data/data.service';
import { Country } from '../../Interfaces/Country';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.css'],
})
export class CountrySelectComponent implements OnInit {
  countries?: Country[];
  @Output() selectedCountry = new EventEmitter<string>();

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.getCountries();
  }

  setSelectedCountry(object: MatSelectChange) {
    this.selectedCountry.emit(object.value);
  }

  getCountries(): void {
    this.data
      .getData()
      .subscribe((object) => this.setCountries(object.Countries));
  }
  setCountries(data: Country[]) {
    this.countries = data;
  }
}
