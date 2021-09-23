import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TransferService } from 'src/app/Services/Transfer/transfer.service';
import { CountryAllData } from 'src/app/Interfaces/CountryAllData';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  dates?: string[];
  cases: number[] = [];

  //properties of the CountryAllData api
  confirmed: number[] = [];
  deaths: number[] = [];
  recovered: number[] = [];
  active: number[] = [];

  title = 'Confirmed';
  @ViewChild('canvasChart') canvasChart: any;

  constructor(private transferService: TransferService) {}

  ngOnInit(): void {
    Chart.register(...registerables);
  }

  getApiResponse(after: Function) {
    this.transferService
      .receiveInfo()
      .subscribe((d) => this.setApiResponse(d, after));
  }

  setApiResponse(apiResponse: CountryAllData[], after: Function) {
    this.dates = [];
    this.confirmed = [];
    this.deaths = [];
    this.recovered = [];
    this.active = [];
    for (let i = 0; i < apiResponse.length; i++) {
      this.dates.push(apiResponse[i].Date.slice(0, -10));
      this.confirmed.push(apiResponse[i].Confirmed);
      this.deaths.push(apiResponse[i].Deaths);
      this.recovered.push(apiResponse[i].Recovered);
      this.active.push(apiResponse[i].Active);
    }
    after();
  }

  ngAfterViewInit() {
    const canvas = this.canvasChart.nativeElement;
    const ctx = canvas.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [''],
        datasets: [
          {
            label: 'Confirmed',
            data: [14],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            // pointBorderColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
          },

          {
            label: 'Deaths',
            data: [1],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            // pointBorderColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
          },

          {
            label: 'Active',
            data: [6],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            // pointBorderColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 2,
          },

          {
            label: 'Recovered',
            data: [10],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            // pointBorderColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,

        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const updateChart = () => {
      myChart.data.datasets[0].data = this.confirmed;
      myChart.data.datasets[1].data = this.deaths;
      myChart.data.datasets[2].data = this.active;
      myChart.data.datasets[3].data = this.recovered;
      myChart.data.labels = this.dates;
      myChart.data.datasets[0].label = this.title;
      myChart.update();
    };

    this.getApiResponse(updateChart);
  }
}
