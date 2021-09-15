import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent implements OnInit {
  @Output() startDate = new EventEmitter<Date>();
  @Output() endDate = new EventEmitter<Date>();

  today: Date = new Date();
  dateRange = new FormGroup({
    start: new FormControl(''),
    end: new FormControl(''),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log(this.today);
  }

  sendStartDate(date: Date) {
    this.startDate.emit(date);
    console.log(date);
  }

  sendEndDate(date: Date) {
    this.endDate.emit(date);
    console.log(date);
  }
}
