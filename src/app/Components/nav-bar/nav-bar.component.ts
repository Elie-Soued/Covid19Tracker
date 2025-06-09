import { Component } from '@angular/core';
import { ChartService } from 'src/app/Components/chart/chart.service';
import { StateSelectComponent } from '../state-select/state-select.component';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: true,
  imports: [
    StateSelectComponent,
    MatSidenav,
    MatSidenavContainer,
    MatListModule,
    MatSidenavContent,
    MatToolbar,
    MatIcon,
    MatButtonModule,
  ],
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
