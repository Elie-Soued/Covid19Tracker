import { Chart, registerables } from 'chart.js';
import { TransferService } from 'src/app/Services/Transfer/transfer.service';
import { Country } from 'src/app/Interfaces/Country';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  apiResponse?: Country[];
  canvas: any;
  ctx?: any;
  @ViewChild('canvasChart') canvasChart: any;

  ngAfterViewInit() {
    this.canvas = this.canvasChart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    Chart.register(...registerables);

    new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: ['confirmed', 'recovered', 'deaths'],
        datasets: [
          {
            label: '# of Votes',
            data: [5, 10, 20],
            // backgroundColor: [
            //   'rgba(255, 99, 132, 0.2)',
            //   'rgba(54, 162, 235, 0.2)',
            //   'rgba(255, 206, 86, 0.2)',
            // ],
            // borderColor: [
            //   'rgba(255, 99, 132, 1)',
            //   'rgba(54, 162, 235, 1)',
            //   'rgba(255, 206, 86, 1)',
            // ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  constructor(private transferService: TransferService) {}

  ngOnInit(): void {
    this.getApiResponse();
  }

  getApiResponse() {
    this.transferService.receiveInfo().subscribe((d) => this.setApiResponse(d));
  }

  setApiResponse(data: Country[]) {
    this.apiResponse = data;
    console.log(this.apiResponse);
  }
}
