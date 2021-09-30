import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.css'],
})
export class RadioButtonsComponent implements OnInit {
  @Output() allDates = new EventEmitter();
  @Output() specificDates = new EventEmitter();
  @Output() rangeSelection = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  hideDatePicker() {
    this.allDates.emit();
  }

  showDatePicker() {
    this.specificDates.emit();
  }

  setRangeSelection(event: any) {
    this.rangeSelection.emit(event.value);
  }
}
