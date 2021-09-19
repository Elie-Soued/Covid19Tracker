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
  apiResponse?: ResultPerCountry[];
  dates: string[] = [];
  cases: number[] = [];
  title?: string;
  canvas: any;
  ctx?: any;
  @ViewChild('canvasChart') canvasChart: any;

  constructor(private transferService: TransferService) {}

  ngOnInit(): void {
    console.log('inside ngOnInit');
    Chart.register(...registerables);
    this.getApiResponse();
    console.log('pilou');
  }

  getApiResponse() {
    this.transferService.receiveInfo().subscribe((d) => this.setApiResponse(d));
  }

  setApiResponse(apiResponse: ResultPerCountry[]) {
    for (let i = 0; i < apiResponse.length; i++) {
      this.dates.push(apiResponse[i].Date.slice(0, -10));
      this.cases.push(apiResponse[i].Cases);
      this.title = apiResponse[0].Status;
    }
    this.apiResponse = apiResponse;
    console.log(this.apiResponse);
    console.log(this.dates);
    console.log(this.cases);
  }

  ngAfterViewInit() {
    console.log('inside ngAfterViewInit');
    this.canvas = this.canvasChart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    const myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: ['Noni', 'pilou', 'Karl'],
        datasets: [
          {
            label: 'Pilou',
            data: [10, 20, 30, 40, 50],
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
    console.log('pilou');
    const updateChart = () => {
      myChart.data.datasets[0].data = this.cases;
      myChart.data.labels = this.dates;
      myChart.update();
    };
    updateChart();
  }
}
