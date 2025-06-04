import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TransferService } from 'src/app/Services/Transfer/transfer.service';
import datasets from './datasets';
import 'chartjs-adapter-date-fns';
import moment from 'moment';

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

  constructor(private transferService: TransferService) {}

  ngOnInit(): void {
    Chart.register(...registerables);
  }

  getApiResponse(after: Function) {
    this.transferService.receiveInfo().subscribe((d) => {
      if (Object.values(d).length) this.setApiResponse(d, after);
    });
  }

  setApiResponse(apiResponse: any, after: Function) {
    this.resetValues();
    this.confirmed.push(apiResponse.data.confirmed);
    this.deaths.push(apiResponse.data.deaths);
    this.recovered.push(apiResponse.data.recovered);
    this.active.push(apiResponse.data.active);
    this.country = apiResponse.data.country;
    this.dates?.push(this.formatDate(apiResponse.data.date));

    after();
  }

  ngAfterViewInit() {
    const canvas = this.canvasChart.nativeElement;

    const myChart = new Chart(canvas, {
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

    const updateChart = () => {
      const updated = [
        this.confirmed,
        this.deaths,
        this.active,
        this.recovered,
      ];
      for (let i = 0; i < updated.length; i++) {
        myChart.data.datasets[i].data = updated[i];
      }
      myChart.data.labels = this.dates;
      myChart.update();
    };

    this.getApiResponse(updateChart);
  }

  formatDate(date: string) {
    return moment(date).format('YYYY-MM-DD');
  }

  resetValues() {
    this.dates = [];
    this.confirmed = [];
    this.deaths = [];
    this.recovered = [];
    this.active = [];
  }
}
