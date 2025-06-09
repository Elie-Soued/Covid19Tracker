import { Component } from '@angular/core';
import { ChartComponent } from './Components/chart/chart.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ChartComponent, NavBarComponent],
})
export class AppComponent {
  title = 'Covid19Tracker';
}
