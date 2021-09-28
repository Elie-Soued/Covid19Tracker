import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TransferService } from 'src/app/Services/Transfer/transfer.service';
import { CountryAllData } from 'src/app/Interfaces/CountryAllData';
import datasets from './datasets';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  //properties of the CountryAllData api
  country?: string;
  confirmed: number[] = [];
  deaths: number[] = [];
  recovered: number[] = [];
  active: number[] = [];
  dates?: string[];

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
      this.country = apiResponse[i].Country;
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
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
          y: {
            beginAtZero: true,
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
}
