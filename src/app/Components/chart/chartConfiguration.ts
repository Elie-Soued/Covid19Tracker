import { ChartConfiguration } from 'chart.js';

export const getConfig = (): ChartConfiguration => ({
  type: 'bar',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Confirmed',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },

      {
        label: 'Deaths',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },

      {
        label: 'Active',
        data: [],
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 2,
      },
    ],
  },
  options: {
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
