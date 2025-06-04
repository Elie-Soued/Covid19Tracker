import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { DataService } from '../../Services/Data/data.service';
import { Country } from '../../Interfaces/Country';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.css'],
  standalone: false,
})
export class CountrySelectComponent implements OnInit {
  countries?: any;
  @Output() selectedCountry = new EventEmitter<string>();

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.getCountries();
  }

  setSelectedCountry(object: MatSelectChange) {
    this.selectedCountry.emit(object.value);
  }

  getCountries(): void {
    this.data.getData().subscribe((object) => {
      console.log('object :>> ', object);
      this.setCountries(object.data);
    });
  }
  setCountries(data: any) {
    console.log('in setCountries');
    this.countries = data;
  }
}
