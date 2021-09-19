import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TransferService } from 'src/app/Services/Transfer/transfer.service';
import { ResultPerCountry } from 'src/app/Interfaces/ResultPerCountry';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  dates: string[] = [];
  cases: number[] = [];
  title = '';
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

  setApiResponse(apiResponse: ResultPerCountry[], after: Function) {
    for (let i = 0; i < apiResponse.length; i++) {
      this.dates.push(apiResponse[i].Date.slice(0, -10));
      this.cases.push(apiResponse[i].Cases);
      this.title = apiResponse[i].Status;
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
            label: 'Covid19',

            data: [1],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],

            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
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
      myChart.data.datasets[0].data = this.cases;
      myChart.data.labels = this.dates;
      myChart.data.datasets[0].label = this.title;
      myChart.update();
    };

    this.getApiResponse(updateChart);
  }
}
