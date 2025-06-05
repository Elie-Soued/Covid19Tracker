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

  constructor(private chartService: ChartService) {}

  ngAfterViewInit() {
    this.initChart();
    this.chartDataSub = this.chartService.chartData$.subscribe((res) => {
      if (res && Object.keys(res).length) {
        this.chart.data.labels = res.labels;

        for (let i = 0; i < res.datasets.length; i++) {
          this.chart.data.datasets[i].data = res.datasets[i];
        }

        this.chart.update();
      }
    });
  }

  initChart() {
    Chart.register(...registerables);
    const canvas = this.canvasChart.nativeElement;
    const config = getConfig();
    this.chart = new Chart(canvas, config);
  }

  ngOnDestroy() {
    this.chartDataSub.unsubscribe();
  }
}
