import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Country } from '../Country';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  countries?: Country[];
  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.data.getData().subscribe((object) => this.setData(object.Countries));
  }

  setData(info: Country[]) {
    this.countries = info;
    console.log(this.countries);
  }
}
