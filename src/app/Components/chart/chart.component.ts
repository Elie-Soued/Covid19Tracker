import {
  Component,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { getConfig } from './chartConfiguration';
import 'chartjs-adapter-date-fns';
import { Subscription } from 'rxjs';
import { ChartService } from 'src/app/Components/chart/chart.service';
import { type formattedData } from './chart.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  standalone: true,
  imports: [MatProgressSpinnerModule],
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasChart') canvasChart!: ElementRef;
  private dataSub: Subscription = new Subscription();
  private loadSub: Subscription = new Subscription();
  private locationSub: Subscription = new Subscription();

  chart!: Chart;
  loading = true;
  location = 'Germany';

  constructor(private chartService: ChartService) {}

  ngOnInit() {
    this.chartService.getInitialData();

    this.loadSub = this.chartService.load$.subscribe(() => {
      this.loading = true;
    });

    this.locationSub = this.chartService.name$.subscribe((res) => {
      if (res) {
        this.location = res;
      }
    });

    this.dataSub = this.chartService.data$.subscribe((res) => {
      this.loading = false;
      this.updateChart(res);
    });
  }

  ngAfterViewInit() {
    this.initChart();
  }

  initChart() {
    Chart.register(...registerables);
    const canvas = this.canvasChart.nativeElement;
    this.chart = new Chart(canvas, getConfig());
  }

  updateChart(res: formattedData) {
    if (res && Object.keys(res).length) {
      this.chart.data.labels = res.labels;

      for (let i = 0; i < res.datasets.length; i++) {
        this.chart.data.datasets[i].data = res.datasets[i];
      }

      this.chart.update();
    }
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
    this.loadSub.unsubscribe();
    this.locationSub.unsubscribe();
  }
}
