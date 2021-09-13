import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/Data/data.service';
import { Country } from '../../Interfaces/Country';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  countries?: Country[];
  case: string[] = [
    'NewConfirmed',
    'TotalConfirmed',
    'NewDeaths',
    'TotalDeaths',
    'NewRecovered',
    'TotalRecovered',
  ];
  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.data
      .getData()
      .subscribe((object) => this.setCountries(object.Countries));
  }

  setCountries(info: Country[]) {
    this.countries = info;
  }
}
