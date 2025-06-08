import { Component } from '@angular/core';
import { ChartService } from 'src/app/Components/chart/chart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: false,
})
export class NavBarComponent {
  selectedState?: string;

  constructor(private chartService: ChartService) {}

  setSelectedState(state: string) {
    this.selectedState = state;
  }

  fetchCovidDataPerState(): void {
    this.chartService.fetchCovidDataPerState(this.selectedState!);
  }
}
