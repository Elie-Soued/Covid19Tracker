import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit {
  @Input() title?: string;
  @Input() data?: any;
  @Input() selectedData: any;
  @Output() info = new EventEmitter<string>();

  //Form controls
  // form = new FormGroup({
  //   select: new FormControl(''),
  // });

  constructor() {}

  ngOnInit(): void {}

  sendInfo(info: string) {
    this.info.emit(info);
  }
}
