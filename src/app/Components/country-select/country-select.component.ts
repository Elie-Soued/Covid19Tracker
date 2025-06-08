import { Component, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import state_codes from './state-codes';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.css'],
  standalone: false,
})
export class CountrySelectComponent {
  states: { name: string; code: string }[] = state_codes;
  @Output() selectedCountry = new EventEmitter<string>();

  setSelectedCountry(object: MatSelectChange) {
    this.selectedCountry.emit(object.value);
  }
}
