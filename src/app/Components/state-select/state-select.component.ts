import { Component, Output, EventEmitter } from '@angular/core';
import {
  MatSelectChange,
  MatFormField,
  MatLabel,
  MatSelect,
  MatOption,
} from '@angular/material/select';
import state_codes from './state-codes';

@Component({
  selector: 'app-state-select',
  templateUrl: './state-select.component.html',
  styleUrls: ['./state-select.component.css'],
  standalone: true,
  imports: [MatFormField, MatLabel, MatSelect, MatOption],
})
export class StateSelectComponent {
  states: { name: string; code: string }[] = state_codes;
  @Output() selectedCountry = new EventEmitter<string>();

  setSelectedCountry(object: MatSelectChange) {
    this.selectedCountry.emit(object.value);
  }
}
