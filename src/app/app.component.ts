import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartService } from './Components/chart/chart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Covid19Tracker';
  location = 'Germany';
  private chartDataSub: Subscription = new Subscription();

  constructor(private chartService: ChartService) {}

  ngOnInit() {
    this.chartDataSub = this.chartService.state$.subscribe((res) => {
      if (res) {
        this.location = res;
      }
    });
  }

  ngOnDestroy() {
    this.chartDataSub.unsubscribe();
  }
}
