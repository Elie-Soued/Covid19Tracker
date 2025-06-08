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

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  standalone: false,
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasChart') canvasChart!: ElementRef;
  private chartDataSub: Subscription = new Subscription();
  chart!: Chart;
  loading = true;

  constructor(private chartService: ChartService) {}

  ngAfterViewInit() {
    this.initChart();
    this.chartService.getInitialData();
    this.chartDataSub = this.chartService.chartData$.subscribe((res) => {
      this.loading = false;
      this.updateChart(res);
    });
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
    this.chartDataSub.unsubscribe();
  }
}
