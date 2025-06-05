import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';

import datasets from './datasets';
import 'chartjs-adapter-date-fns';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { ChartService } from 'src/app/service/chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  standalone: false,
})
export class ChartComponent implements OnInit, AfterViewInit {
  country?: string;
  confirmed: number[] = [];
  deaths: number[] = [];
  recovered: number[] = [];
  active: number[] = [];
  dates?: string[];
  @ViewChild('canvasChart') canvasChart: any;
  private chartDataSub: Subscription = new Subscription();

  chart: any;

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    Chart.register(...registerables);
    this.chartDataSub = this.chartService.chartData$.subscribe((res) => {
      if (Object.keys(res).length) {
        this.resetValues();
        this.confirmed.push(res.data.confirmed);
        this.deaths.push(res.data.deaths);
        this.recovered.push(res.data.recovered);
        this.active.push(res.data.active);
        this.country = res.data.country;
        this.dates?.push(this.formatDate(res.data.date));

        const updated = [
          this.confirmed,
          this.deaths,
          this.active,
          this.recovered,
        ];

        for (let i = 0; i < updated.length; i++) {
          this.chart.data.datasets[i].data = updated[i];
        }
        this.chart.data.labels = this.dates;

        this.chart.update();
      }
    });
  }

  ngAfterViewInit() {
    const canvas = this.canvasChart.nativeElement;
    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: [''],
        datasets,
      },
      options: {
        plugins: {
          legend: {
            onHover() {
              canvas.style.cursor = 'pointer';
            },
            onLeave() {
              canvas.style.cursor = 'auto';
            },
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
        },

        responsive: true,
        maintainAspectRatio: false,

        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            type: 'time',
            time: {
              minUnit: 'day',
            },
          },
        },
      },
    });
  }

  resetValues() {
    this.dates = [];
    this.confirmed = [];
    this.deaths = [];
    this.recovered = [];
    this.active = [];
  }

  formatDate(date: string) {
    return moment(date).format('YYYY-MM-DD');
  }
}
