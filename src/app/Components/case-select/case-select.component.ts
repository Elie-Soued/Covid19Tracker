import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-case-select',
  templateUrl: './case-select.component.html',
  styleUrls: ['./case-select.component.css'],
})
export class CaseSelectComponent implements OnInit {
  cases: string[] = ['confirmed', 'recovered', 'deaths'];
  @Output() selectedCase = new EventEmitter<MatSelectChange>();

  constructor() {}

  ngOnInit(): void {}

  setSelectedCase(object: MatSelectChange) {
    this.selectedCase = object.value;
  }
}
